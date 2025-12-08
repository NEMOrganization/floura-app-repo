using Floura.Api.Controllers;
using Floura.Core.Interfaces;
using Floura.Core.Models;
using Floura.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Floura.Tests.Controllers
{
    public class StoryControllerUnitTest
    {
        private readonly Mock<IStoryService> _mockstoryService;
        private readonly StoriesController _storyController;

        public StoryControllerUnitTest()
        {
            _mockstoryService = new Mock<IStoryService>();
        }

        [Fact]
        public async Task GetAll_ReturnsOK_WhenStoriesExist()
        {
            // Arrange

            var storyId = Guid.NewGuid();

            var listOfStories = new List<Story>
            {
                new Story
                {
                  Id = storyId,
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

            _mockstoryService
                .Setup(service => service.GetAllAsync())
                .ReturnsAsync(listOfStories);

            var storyController = new StoriesController(_mockstoryService.Object);


            // Act
            var result = await storyController.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedStories = Assert.IsAssignableFrom<IEnumerable<Story>>(okResult.Value);

            Assert.Equal(2, returnedStories.Count());
            _mockstoryService.Verify(s => s.GetAllAsync(), Times.Once);
        }

        [Fact]
        public async Task GetAll_ReturnsOK_WhenStoriesDoesNotExist()
        {
            // Arrange
            var emptyList = new List<Story>();
           
            _mockstoryService
                .Setup(service => service.GetAllAsync())
                .ReturnsAsync(emptyList);

            var controller = new StoriesController(_mockstoryService.Object);

            // Act
            var result = await controller.GetAll();

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("The list is empty", notFoundResult.Value);
            _mockstoryService.Verify(controller => controller.GetAllAsync(), Times.Once);
        }
        
    }
}