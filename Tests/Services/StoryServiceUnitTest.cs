using System;
namespace Floura.Tests

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
            AgeRange = 1
        }
        _mockStoryRepository
            .Setup(repo => repo.AddAsync(It.IsAny<Story>()))
            .ReturnsAsync(newStory);

        var storyService = new StoryService(_mockStoryRepository.Object); // dette er vores SUT objekt

        // Act 
        var result = storyService.CreateAsync(newStory);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Story", result.Title);

        _mockStoryRepository.Verify(repo => repo.AddAsync(It.IsAny<Story>()), Times.Once);
    }
}
