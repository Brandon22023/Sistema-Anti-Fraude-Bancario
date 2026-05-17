namespace Backend.DTOs.Auth;

public sealed record LoginRequestDto(
	string Email,
	string Password,
	bool RememberDevice = true);