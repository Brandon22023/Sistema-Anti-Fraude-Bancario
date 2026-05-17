using Backend.DTOs.Auth;
using Backend.Helpers;
using Microsoft.Data.SqlClient;

namespace Backend.Services;

public sealed class AuthService
{
	private readonly IConfiguration _configuration;
	private readonly TokenService _tokenService;

	public AuthService(IConfiguration configuration, TokenService tokenService)
	{
		_configuration = configuration;
		_tokenService = tokenService;
	}

	public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto request, CancellationToken cancellationToken)
	{
		if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
		{
			return null;
		}

		var connectionString = _configuration.GetConnectionString("DefaultConnection")
			?? Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

		if (string.IsNullOrWhiteSpace(connectionString))
		{
			throw new InvalidOperationException("No se encontró la cadena de conexión DefaultConnection.");
		}

		await using var connection = new SqlConnection(connectionString);
		await connection.OpenAsync(cancellationToken);

		var normalizedEmail = request.Email.Trim();

		const string query = @"
SELECT TOP 1
	U.UserId,
	U.FullName,
	U.Email,
	U.PasswordHash,
	U.IsActive,
	R.Name AS RoleName
FROM Users U
INNER JOIN Roles R ON R.RoleId = U.RoleId
WHERE LOWER(LTRIM(RTRIM(U.Email))) = LOWER(@Email);";

		await using var command = new SqlCommand(query, connection);
		command.Parameters.AddWithValue("@Email", normalizedEmail);

		await using var reader = await command.ExecuteReaderAsync(cancellationToken);

		if (!await reader.ReadAsync(cancellationToken))
		{
			return null;
		}

		var isActive = reader.GetBoolean(reader.GetOrdinal("IsActive"));
		if (!isActive)
		{
			return null;
		}

		var storedPassword = reader.GetString(reader.GetOrdinal("PasswordHash"));
		if (!PasswordHasher.VerifyPassword(storedPassword, request.Password.Trim()))
		{
			return null;
		}

		var userId = reader.GetInt32(reader.GetOrdinal("UserId"));
		var fullName = reader.GetString(reader.GetOrdinal("FullName"));
		var email = reader.GetString(reader.GetOrdinal("Email"));
		var role = NormalizeRole(reader.GetString(reader.GetOrdinal("RoleName")));

		return _tokenService.CreateToken(userId, fullName, email, role);
	}

	private static string NormalizeRole(string roleName)
	{
		return roleName.Trim().ToUpperInvariant() switch
		{
			"ADMIN" or "ADMINISTRATOR" or "ADMINISTRADOR" => "ADMIN",
			"ANALYST" or "ANALISTA" => "ANALISTA",
			"SUPERVISOR" => "SUPERVISOR",
			"VIEWER" or "VISOR" => "VISOR",
			var other => other
		};
	}
}