using Castle.Components.DictionaryAdapter.Xml;
using Floura.Api.Repositories;
using Floura.Core.Models;
using Microsoft.EntityFrameworkCore;
namespace Floura.Tests;

public class StoryRepositoryTests
{
    private readonly FlouraDbContext _context;
    private readonly StoryRepository _repository;

    public StoryRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<FlouraDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new FlouraDbContext(options);
        _repository = new StoryRepository(_context);
    }

    public void Dispose()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Fact]
    public async Task GetAllAsync_ReturnsAllStories_WhenStoriesExist()
    {
        // Arrange 

        var story1 = new Story
        {
            Id = Guid.NewGuid(),
            Title = "Story 1",
            Summary = "This is a test story.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        var story2 = new Story
        {
            Id = Guid.NewGuid(),
            Title = "Story 2",
            Summary = "This is a test story.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _context.Stories.AddRange(story1, story2);
        await _context.SaveChangesAsync();

        // Act 
        var result = await _repository.GetAllAsync();

        // Assert 
        var list = result.ToList();
        Assert.Equal(2, list.Count);
        Assert.Contains(list, story => story.Title == "Story 1");
        Assert.Contains(list, story => story.Title == "Story 2");
        Assert.All(list, story => Assert.NotNull(story.StoryBits));
    }


    [Fact]
    public async Task GetAllAsync_ReturnsEmptyList_WhenNoStoriesExist()
    {
        // Arrange: ingen seed

        // Act 
        var result = await _repository.GetAllAsync();

        // Assert 
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsStory_WithStoryBits_WhenItExists()
    {
        // Arrange
        var id = Guid.NewGuid();

        var story = new Story
        {
            Id = id,
            Title = "Existing story",
            Summary = "Test",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5,
            StoryBits = new List<StoryBits>
            {
                new StoryBits
                {
                    Id = Guid.NewGuid(),
                    Text = "Bit",
                    Image = "s.png",
                    Order = 1
                }
            }
        };

        _context.Stories.Add(story);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetByIdAsync(id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(id, result!.Id);
        Assert.Equal("Existing story", result.Title);

        Assert.NotNull(result.StoryBits);
        var bits = result.StoryBits.ToList();
        Assert.Single(bits);

        var bit = bits.First();
        Assert.Equal("Bit", bit.Text);
    }

    [Fact]
    public async Task AddAsync_ThrowsArgumentNullException_WhenStoryIsNull()
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(
            () => _repository.AddAsync(null!)
        );
    }

    [Fact]
    public async Task AddAsync_AddsStory_WhenStoryIsValid()
    {
        // Arrange
        var storyId = Guid.NewGuid();

        var story = new Story
        {
            Id = storyId,
            Title = "Test Story",
            Summary = "This is a test story.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act
        var result = await _repository.AddAsync(story);

        // Assert
        Assert.NotNull(result);
        Assert.NotEqual(Guid.Empty, result.Id);

        var dB = await _context.Stories.FindAsync(result.Id);
        Assert.NotNull(dB);
    }

    [Fact]
    public async Task UpdateAsync_Update_WhenStoryExists()
    {
        var id = Guid.NewGuid();

        var existing = new Story
        {
            Id = id,
            Title = "Old title",
            Summary = "Old summary",
            CoverImage = "old.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _context.Stories.Add(existing);
        await _context.SaveChangesAsync();

        var updated = new Story
        {
            Id = id,
            Title = "New title",
            Summary = "New summary",
            CoverImage = "new.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        var result = await _repository.UpdateAsync(id, updated);

        Assert.NotNull(result);
        Assert.Equal("New title", result!.Title);
        Assert.Equal("New summary", result.Summary);
        Assert.Equal("new.jpg", result.CoverImage);
        Assert.Equal(Core.Models.Enums.AgeRange.Age2To5, result.AgeRange);

        var fromDb = await _repository.GetByIdAsync(id);

        Assert.NotNull(fromDb);
        Assert.Equal("New title", fromDb!.Title);
        Assert.Equal("New summary", fromDb.Summary);
        Assert.Equal("new.jpg", fromDb.CoverImage);
        Assert.Equal(Core.Models.Enums.AgeRange.Age2To5, fromDb.AgeRange);
    }



    [Fact]
    public async Task UpdateAsync_ReturnsNull_WhenStoryDoesNotExist()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var updatedStory = new Story
        {
            Id = storyId,
            Title = "New title",
            Summary = "New summary",
            CoverImage = "new.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5,
        };

        // Act
        var result = await _repository.UpdateAsync(storyId, updatedStory);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task DeleteAsync_ReturnsFalse_WhenStoryDoesNotExist()
    {
        // Arrange
        var storyId = Guid.NewGuid();

        // Act
        var result = await _repository.DeleteAsync(storyId);

        // Assert
        Assert.False(result);
    }
}
