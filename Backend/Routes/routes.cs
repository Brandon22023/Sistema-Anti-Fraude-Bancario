using Backend.Controllers;

namespace Backend.Routes;

public static class Routes
{
	public static void Map(WebApplication app)
	{
		app.MapPost("/auth/login", AuthController.Login)
			.WithName("Login");

		app.MapGet("/health/database", HealthController.GetDatabaseHealth)
			.WithName("GetDatabaseHealth");
	}
}
