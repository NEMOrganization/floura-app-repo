using Floura.Api.Repositories;
using Floura.Api.Services;
using Floura.Core.Interfaces;
using Floura.Core.Services;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.IdentityModel.Logging;

var builder = WebApplication.CreateBuilder(args);

//IdentityModelEventSource.ShowPII = true;

builder.Logging.ClearProviders();

builder.Host.UseSerilog((context, services, configuration) => {
    configuration
        .WriteTo.Console()
        .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day);
});

builder.Logging.AddDebug();

var jwtSettings = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSettings["Key"]
    ?? throw new InvalidOperationException("Jwt Key is missing in configuration");

var key = Encoding.UTF8.GetBytes(jwtKey);

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });


builder.Services.AddDbContext<FlouraDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IStoryRepository, StoryRepository>();
builder.Services.AddScoped<IStoryService, StoryService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowSpecificOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDeveloperExceptionPage();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyAllowSpecificOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

try{
    app.Run();
}

catch (Exception ex)
{
    Console.WriteLine($"Application failed to start: {ex}");
    throw;
}
