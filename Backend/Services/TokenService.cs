using Backend.DTOs.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Services;

public sealed class TokenService
{
	private readonly IConfiguration _configuration;

	public TokenService(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public LoginResponseDto CreateToken(int userId, string fullName, string email, string role)
	{
		var issuer = _configuration["Jwt:Issuer"] ?? "SentinelPay";
		var audience = _configuration["Jwt:Audience"] ?? "SentinelPay";
		var key = _configuration["Jwt:Key"] ?? "sentinelpay-dev-key-change-me-1234567890";
		var expirationMinutes = int.TryParse(_configuration["Jwt:ExpirationMinutes"], out var parsedMinutes)
			? parsedMinutes
			: 120;

		var expiresAt = DateTime.UtcNow.AddMinutes(expirationMinutes);
		var claims = new List<Claim>
		{
			new(ClaimTypes.NameIdentifier, userId.ToString()),
			new(ClaimTypes.Name, fullName),
			new(ClaimTypes.Email, email),
			new(ClaimTypes.Role, role),
			new(JwtRegisteredClaimNames.Sub, email),
			new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
		};

		var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
		var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
		var token = new JwtSecurityToken(
			issuer,
			audience,
			claims,
			notBefore: DateTime.UtcNow,
			expires: expiresAt,
			signingCredentials: credentials);

		return new LoginResponseDto(
			userId,
			fullName,
			email,
			role,
			new JwtSecurityTokenHandler().WriteToken(token),
			expiresAt);
	}
}