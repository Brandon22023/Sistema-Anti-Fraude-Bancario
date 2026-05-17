using Backend.DTOs.Auth;
using Backend.Services;

namespace Backend.Controllers;

public static class AuthController
{
	public static async Task<IResult> Login(LoginRequestDto request, AuthService authService, CancellationToken cancellationToken)
	{
		var response = await authService.LoginAsync(request, cancellationToken);

		return response is null
			? Results.Unauthorized()
			: Results.Ok(response);
	}
}