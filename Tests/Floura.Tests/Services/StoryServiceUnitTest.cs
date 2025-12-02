using Floura.Core.Interfaces;
using Floura.Core.Models;
using Floura.Core.Services;
using Moq;
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
}


