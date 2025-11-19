using Floura.Api.Repositories;
using Floura.Api.Services;
using Floura.Core.Interfaces;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();



builder.Services.AddSingleton<IStoryRepository, StoryRepository>();
builder.Services.AddSingleton<IStoryService, StoryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
