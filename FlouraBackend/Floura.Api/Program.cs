using Floura.Api.Repositories;
using Floura.Core.Interfaces;
using Floura.Core.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


builder.Services.AddSingleton<IStoryRepository, StoryRepository>();
builder.Services.AddSingleton<IStoryService, StoryService>();

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

// CORS skal ligge før MapControllers
app.UseCors("MyAllowSpecificOrigins");

app.UseAuthorization();
app.MapControllers();

app.Run();
