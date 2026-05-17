using System.Security.Cryptography;

namespace Backend.Helpers;

public static class PasswordHasher
{
	private const int Iterations = 100_000;
	private const int SaltSize = 16;
	private const int KeySize = 32;

	public static string HashPassword(string password)
	{
		var salt = RandomNumberGenerator.GetBytes(SaltSize);
		var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithmName.SHA256, KeySize);

		return $"PBKDF2${Iterations}${Convert.ToBase64String(salt)}${Convert.ToBase64String(hash)}";
	}

	public static bool VerifyPassword(string storedPassword, string providedPassword)
	{
		if (string.IsNullOrWhiteSpace(storedPassword))
		{
			return false;
		}

		if (!storedPassword.StartsWith("PBKDF2$", StringComparison.OrdinalIgnoreCase))
		{
			return string.Equals(storedPassword, providedPassword, StringComparison.Ordinal);
		}

		var parts = storedPassword.Split('$', 4, StringSplitOptions.TrimEntries);

		if (parts.Length != 4 || !int.TryParse(parts[1], out var iterations))
		{
			return false;
		}

		var salt = Convert.FromBase64String(parts[2]);
		var expectedHash = Convert.FromBase64String(parts[3]);
		var actualHash = Rfc2898DeriveBytes.Pbkdf2(providedPassword, salt, iterations, HashAlgorithmName.SHA256, expectedHash.Length);

		return CryptographicOperations.FixedTimeEquals(actualHash, expectedHash);
	}
}