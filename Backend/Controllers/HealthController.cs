using System.Diagnostics;
using System.Net.Sockets;

namespace Backend.Controllers;

public static class HealthController
{
	public static async Task<IResult> GetDatabaseHealth(IConfiguration configuration, CancellationToken cancellationToken)
	{
		var connectionString = configuration.GetConnectionString("DefaultConnection")
			?? Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

		if (string.IsNullOrWhiteSpace(connectionString))
		{
			return Results.Problem(
				title: "Connection string not configured",
				detail: "No se encontró la cadena de conexión DefaultConnection.",
				statusCode: StatusCodes.Status503ServiceUnavailable);
		}

		var stopwatch = Stopwatch.StartNew();
		var serverInfo = ParseServerInfo(connectionString);

		try
		{
			using var client = new TcpClient();
			await client.ConnectAsync(serverInfo.Host, serverInfo.Port, cancellationToken);

			stopwatch.Stop();

			return Results.Ok(new
			{
				healthy = true,
				status = "running",
				server = serverInfo.Host,
				port = serverInfo.Port,
				responseTimeMs = stopwatch.ElapsedMilliseconds
			});
		}
		catch (Exception ex)
		{
			stopwatch.Stop();

			return Results.Ok(new
			{
				healthy = false,
				status = "down",
				server = serverInfo.Host,
				port = serverInfo.Port,
				responseTimeMs = stopwatch.ElapsedMilliseconds,
				error = ex.Message
			});
		}
	}

	private static (string Host, int Port) ParseServerInfo(string connectionString)
	{
		const string defaultHost = "localhost";
		const int defaultPort = 1433;

		var serverSegment = connectionString
			.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
			.FirstOrDefault(segment => segment.StartsWith("Server=", StringComparison.OrdinalIgnoreCase) ||
									   segment.StartsWith("Data Source=", StringComparison.OrdinalIgnoreCase));

		if (string.IsNullOrWhiteSpace(serverSegment))
		{
			return (defaultHost, defaultPort);
		}

		var value = serverSegment[(serverSegment.IndexOf('=') + 1)..].Trim();
		var parts = value.Split(',', 2, StringSplitOptions.TrimEntries);

		var host = string.IsNullOrWhiteSpace(parts[0]) ? defaultHost : parts[0];

		if (parts.Length == 2 && int.TryParse(parts[1], out var parsedPort))
		{
			return (host, parsedPort);
		}

		return (host, defaultPort);
	}
}