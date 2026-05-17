using Backend.Services;
using Backend.Routes;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddPolicy("Frontend", policy =>
		policy.AllowAnyOrigin()
			.AllowAnyHeader()
			.AllowAnyMethod());
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "SentinelPay";
		var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "SentinelPay";
		var jwtKey = builder.Configuration["Jwt:Key"] ?? "sentinelpay-dev-key-change-me-1234567890";

		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ValidIssuer = jwtIssuer,
			ValidAudience = jwtAudience,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
			ClockSkew = TimeSpan.FromMinutes(1)
		};
	});

builder.Services.AddAuthorization();
builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<AuthService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
	app.UseHttpsRedirection();
}

app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();

Routes.Map(app);

app.Run();
