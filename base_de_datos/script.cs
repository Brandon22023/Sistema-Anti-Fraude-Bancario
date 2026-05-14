using System;

namespace BaseDeDatos;

public static class Script
{
	public static string BuildConnectionString(string server = "host.docker.internal", string database = "SentinelPayDb", string password = "Your_password123!")
	{
		return $"Server={server},1433;Database={database};User Id=sa;Password={password};TrustServerCertificate=True;Encrypt=False";
	}

	public static string BuildBackendEnv(string server = "host.docker.internal", string database = "SentinelPayDb", string password = "Your_password123!")
	{
		return $"ConnectionStrings__DefaultConnection={BuildConnectionString(server, database, password)}";
	}
}
