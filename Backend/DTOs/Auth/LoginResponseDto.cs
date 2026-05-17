namespace Backend.DTOs.Auth;

public sealed record LoginResponseDto(
	int UserId,
	string FullName,
	string Email,
	string Role,
	string Token,
	DateTime ExpiresAt,
	string TokenType = "Bearer");