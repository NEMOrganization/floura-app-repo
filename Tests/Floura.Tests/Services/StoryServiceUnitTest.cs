using Floura.Core.Interfaces;
using Floura.Core.Models;
using Floura.Core.Services;
using Moq;
using System.Collections.Generic;
using System.Reflection.PortableExecutable;
using Xunit.Sdk;
namespace Floura.Tests;

public class StoryServiceUnitTest
{
    private readonly Mock<IStoryRepository> _mockStoryRepository;
    private readonly IStoryService _storyService;

    public StoryServiceUnitTest()
    {
        _mockStoryRepository = new Mock<IStoryRepository>(MockBehavior.Strict);
    }

    [Fact]
    public async Task CreateAsync_ShouldCreateStory_Successfully()
    {
        // Arrange 
        var newStory = new Story
        {
            Id = Guid.NewGuid(),
            Title = "Test Story",
            Summary = "This is a test story.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _mockStoryRepository
        .Setup(repo => repo.AddAsync(newStory))
        .ReturnsAsync(newStory);

        var storyService = new StoryService(_mockStoryRepository.Object); // dette er vores SUT objekt

        // Act 
        var result = await storyService.CreateAsync(newStory);

        // Assert
        Assert.NotNull(result);
        Assert.Same(newStory, result);
        Assert.Equal(newStory.Id, result.Id);
        _mockStoryRepository.Verify(repo => repo.AddAsync(newStory), Times.Once);
    }

    [Fact]
    public async Task CreateAsync_ShouldThrowArgumentNullException_WhenStoryIsNull()
    {
        // Arrange 
        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act & Assert
        var ex = await Assert.ThrowsAsync<ArgumentNullException>(() => storyService.CreateAsync(null!));
        Assert.Equal("story", ex.ParamName);
        _mockStoryRepository.Verify(repo => repo.AddAsync(It.IsAny<Story>()), Times.Never);
    }

    [Fact]
    public async Task CreateAsync_ShouldPropagateException_WhenRepositoryThrows()
    {
        // Arrange
        var newStory = new Story
        {
            Id = Guid.NewGuid(),
            Title = "Test Story",
            Summary = "This is a test story.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _mockStoryRepository
       .Setup(repo => repo.AddAsync(newStory))
       .ThrowsAsync(new InvalidOperationException("error"));

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act & Assert 
        await Assert.ThrowsAsync<InvalidOperationException>(() => storyService.CreateAsync(newStory));
        _mockStoryRepository.Verify(repo => repo.AddAsync(newStory), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnStory_WhenStoryExists()
    {
        // Arrange 
        var storyId = Guid.NewGuid();
        var existingStory = new Story
        {
            Id = storyId,
            Title = "Test Story",
            Summary = "This is a test story.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _mockStoryRepository
            .Setup(repo => repo.GetByIdAsync(storyId))
            .ReturnsAsync(existingStory);

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act
        var result = await storyService.GetByIdAsync(storyId);

        // Assert 
        Assert.NotNull(result);
        Assert.Equal(existingStory.Id, result.Id);
        Assert.Equal(existingStory.Title, result.Title);
        _mockStoryRepository.Verify(repo => repo.GetByIdAsync(storyId), Times.Once);

    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnNull_WhenStoryDoesNotExist()
    {
        // Arrange
        var storyId = Guid.NewGuid();

        _mockStoryRepository
        .Setup(repo => repo.GetByIdAsync(storyId))
        .ReturnsAsync((Story?)null);

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act 
        var result = await storyService.GetByIdAsync(storyId);

        // Assert
        Assert.Null(result);
        _mockStoryRepository.Verify(repo => repo.GetByIdAsync(storyId), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldCallRepositoryOnce_WithSameId()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var existingStory = new Story
        {
            Id = storyId,
            Title = "Test Story",
            Summary = "This is a test story.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _mockStoryRepository
        .Setup(repo => repo.GetByIdAsync(storyId))
        .ReturnsAsync(existingStory);

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act
        var result = await storyService.GetByIdAsync(storyId);

        // Assert
        Assert.NotNull(result);
        _mockStoryRepository.Verify(repo => repo.GetByIdAsync(It.Is<Guid>(id => id == storyId)), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldPropagateException_WhenRepositoryThrows()
    {
        // Arrange 
        var storyId = Guid.NewGuid();

        _mockStoryRepository
          .Setup(repo => repo.GetByIdAsync(storyId))
          .ThrowsAsync(new InvalidOperationException("error"));

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act & Assert 
        await Assert.ThrowsAsync<InvalidOperationException>(() => storyService.GetByIdAsync(storyId));
        _mockStoryRepository.Verify(repo => repo.GetByIdAsync(storyId), Times.Once);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnStories_WhenStoriesExist()
    {
        // Arrange
        var listOfStories = new List<Story>
    {
        new Story
        {
            Id = Guid.NewGuid(),
            Title = "Test Story 1",
            Summary = "This is a test story.",
            CoverImage = "http://example.com/image1.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        },
        new Story
        {
            Id = Guid.NewGuid(),
            Title = "Test Story 2",
            Summary = "This is another test story.",
            CoverImage = "http://example.com/image2.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        }
    };

        _mockStoryRepository
            .Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(listOfStories);

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act
        var result = await storyService.GetAllAsync();

        // Assert
        Assert.NotNull(result);

        var resultList = result.ToList();
        Assert.Equal(listOfStories.Count, resultList.Count);
        Assert.Equal(listOfStories[0].Id, resultList[0].Id);
        Assert.Equal(listOfStories[1].Id, resultList[1].Id);

        _mockStoryRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
    }


    [Fact]
    public async Task GetAllAsync_ShouldReturnEmptyList_WhenNoStoriesExist()
    {
        // Arrange
        var emptyList = new List<Story>();

        _mockStoryRepository
            .Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(emptyList);

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act
        var result = await storyService.GetAllAsync();

        // Assert
        Assert.Empty(result);
        _mockStoryRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task GetAllAsync_ShouldPropagateException_WhenRepositoryThrows()
    {
        // Arrange
        var newStoryList = new List<Story>();

        _mockStoryRepository
            .Setup(repo => repo.GetAllAsync())
            .ThrowsAsync(new InvalidOperationException("error"));

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act & Assert 
        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            storyService.GetAllAsync()
        );

        _mockStoryRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdateAndReturnStory_WhenStoryExists()
    {
        // Arrange
        var storyId = Guid.NewGuid();

        var existingStory = new Story
        {
            Id = storyId,
            Title = "Old Title",
            Summary = "Old summary",
            CoverImage = "old.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        var updatedStory = new Story
        {
            Id = storyId,
            Title = "New Title",
            Summary = "New summary",
            CoverImage = "new.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _mockStoryRepository
            .Setup(repo => repo.GetByIdAsync(storyId))
            .ReturnsAsync(existingStory);

        _mockStoryRepository
            .Setup(repo => repo.UpdateAsync(storyId, updatedStory))
            .ReturnsAsync(updatedStory);

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act
        var result = await storyService.UpdateAsync(storyId, updatedStory);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(updatedStory, result);

        _mockStoryRepository.Verify(repo => repo.GetByIdAsync(storyId), Times.Once);
        _mockStoryRepository.Verify(repo => repo.UpdateAsync(storyId, updatedStory), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_ShouldReturnNull_WhenStoryDoesNotExist()
    {
        // Arrange
        var storyId = Guid.NewGuid();

        var updatedStory = new Story
        {
            Id = storyId,
            Title = "New Title",
            Summary = "New summary",
            CoverImage = "new.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };
        _mockStoryRepository
            .Setup(repo => repo.GetByIdAsync(storyId))
            .ReturnsAsync((Story?)null);

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act
        var result = await storyService.UpdateAsync(storyId, updatedStory);

        // Assert
        Assert.Null(result); 

        _mockStoryRepository.Verify(repo => repo.GetByIdAsync(storyId), Times.Once);
        _mockStoryRepository.Verify(repo => repo.UpdateAsync(It.IsAny<Guid>(), It.IsAny<Story>()), Times.Never);
    }

    [Fact]
    public async Task UpdateAsync_ShouldPropagateException_WhenGetByIdAsyncThrows()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var updatedStory = new Story
        {
            Id = storyId,
            Title = "New Title",
            Summary = "New summary",
            CoverImage = "new.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _mockStoryRepository
            .Setup(repo => repo.GetByIdAsync(storyId))
            .ThrowsAsync(new InvalidOperationException("error"));

        var storyService = new StoryService(_mockStoryRepository.Object);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            storyService.UpdateAsync(storyId, updatedStory)
        );

        // Ensure UpdateAsync was NEVER called since GetByIdAsync failed
        _mockStoryRepository.Verify(
            repo => repo.UpdateAsync(It.IsAny<Guid>(), It.IsAny<Story>()),
            Times.Never
        );
    }
}
