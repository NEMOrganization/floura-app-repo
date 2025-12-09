using Floura.Api.Controllers;
using Floura.Core.Interfaces;
using Floura.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Floura.Tests.Controllers
{
    public class StoryControllerUnitTest
    {
        private readonly Mock<IStoryService> _mockStoryService;

        public StoryControllerUnitTest()
        {
            _mockStoryService = new Mock<IStoryService>();
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

            _mockStoryService
                .Setup(service => service.GetAllAsync())
                .ReturnsAsync(listOfStories);

            var storyController = new StoriesController(_mockStoryService.Object);


            // Act
            var result = await storyController.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedStories = Assert.IsAssignableFrom<IEnumerable<Story>>(okResult.Value);

            Assert.Equal(2, returnedStories.Count());
            _mockStoryService.Verify(service => service.GetAllAsync(), Times.Once);
        }

        [Fact]
        public async Task GetAll_ReturnsNotFound_WhenNoStoriesExist()
        {
            // Arrange
            var emptyList = new List<Story>();
           
            _mockStoryService
                .Setup(service => service.GetAllAsync())
                .ReturnsAsync(emptyList);

            var storyController = new StoriesController(_mockStoryService.Object);

            // Act
            var result = await storyController.GetAll();

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("The list is empty", notFoundResult.Value);
            _mockStoryService.Verify(service => service.GetAllAsync(), Times.Once);
        }

        [Fact]
        public async Task Get_ReturnsOK_WhenStoryExists()
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

            _mockStoryService
                .Setup(service => service.GetByIdAsync(storyId))
                .ReturnsAsync(story);

            var storyController = new StoriesController(_mockStoryService.Object);

            // Act 
            var result = await storyController.Get(storyId);

            // Assert 
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedStory = Assert.IsType<Story>(okResult.Value);

            Assert.Equal(storyId, returnedStory.Id);
            Assert.Equal("Test Story", returnedStory.Title);

            _mockStoryService.Verify(s => s.GetByIdAsync(storyId), Times.Once);
        }


        [Fact]
        public async Task Get_ReturnsNotFound_WhenStoryDoesNotExistById()
        {
            // Arrange
            var storyId = Guid.NewGuid();

            _mockStoryService
                .Setup(service => service.GetByIdAsync(storyId))
                .ReturnsAsync((Story?)null);

            var storyController = new StoriesController(_mockStoryService.Object);

            // Act 
            var result = await storyController.Get(storyId);

            // Assert 
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("The id does not exist", notFoundResult.Value);
            _mockStoryService.Verify(service => service.GetByIdAsync(storyId), Times.Once );
            
        }
        [Fact]
        public async Task Post_ReturnsBadRequest_WhenStoryIsNull()
        {
            // Arrange
            Story? nullStory = null;
            var controller = new StoriesController(_mockStoryService.Object);

            // Act
            var result = await controller.Post(nullStory);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("Story object can't be null", badRequestResult.Value);
            _mockStoryService.Verify(service => service.CreateAsync(It.IsAny<Story>()), Times.Never);
        }

        [Fact]
        public async Task Post_ReturnsCreated_WhenStoryIsValid()
        {
            // Arrange 
            var storyId = Guid.NewGuid();
            var story = new Story
            {
               Id = storyId,
               Title = "Test Story 123",
               Summary = "This is a test story.",
               CoverImage = "http://example.com/image1.jpg",
               AgeRange = Core.Models.Enums.AgeRange.Age2To5
            };

            _mockStoryService
                .Setup(service => service.CreateAsync(story))
                .ReturnsAsync(story);

            var storyController = new StoriesController(_mockStoryService.Object);

            // Act
            var result = await storyController.Post(story);


            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnedStory = Assert.IsType<Story>(createdResult.Value);

            Assert.Equal(storyId, returnedStory.Id);
            _mockStoryService.Verify(service => service.CreateAsync(story), Times.Once);
        }

        [Fact]
        public async Task Post_ReturnsBadRequest_WhenServiceThrowsException()
        {
            // Arrange
            var storyId = Guid.NewGuid();
            var newStory = new Story
            {
                Id = storyId,
                Title = "Test Story",
                Summary = "This is a test story.",
                CoverImage = "http://example.com/image.jpg",
                AgeRange = Core.Models.Enums.AgeRange.Age2To5
            };

            _mockStoryService
                .Setup(service => service.CreateAsync(newStory))
                .ThrowsAsync(new InvalidOperationException("something went wrong"));

            var controller = new StoriesController(_mockStoryService.Object);

            // Act 
            var result = await controller.Post(newStory);

            // Assert 
           var BadRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("something went wrong", BadRequest.Value);

            _mockStoryService.Verify(service => service.CreateAsync(newStory), Times.Once);
        }

        [Fact]
        public async Task Put_ReturnsOK_WhenUpdateSucceeds()
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

            _mockStoryService
                .Setup(service => service.UpdateAsync(storyId, updatedStory))
                .ReturnsAsync(updatedStory);

            var controller = new StoriesController(_mockStoryService.Object);

            // Act 
            var result = await controller.Put(storyId, updatedStory);


            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var story = Assert.IsType<Story>(okResult.Value);

            Assert.Equal(updatedStory.Id, story.Id);
            _mockStoryService.Verify(service => service.UpdateAsync(storyId, updatedStory), Times.Once);

        }
        [Fact]
        public async Task Put_ReturnsNotFound_WhenStoryDoesNotExist()
        {
            // Arrange
            var storyId = Guid.NewGuid();
            var existingStory = new Story
            {
                Id = storyId,
                Title = "New Title",
                Summary = "New summary",
                CoverImage = "new.jpg",
                AgeRange = Core.Models.Enums.AgeRange.Age2To5
            };

            _mockStoryService
                .Setup(service => service.UpdateAsync(storyId, existingStory))
                .ReturnsAsync((Story?)null);

            var controller = new StoriesController(_mockStoryService.Object);

            // Act
            var result = await controller.Put(storyId, existingStory);

            // Assert 
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("Story not found", notFoundResult.Value);
            _mockStoryService.Verify(service => service.UpdateAsync(storyId, existingStory), Times.Once);
        }
        
        [Fact]
        public async Task Put_ReturnsNotFound_WhenServiceThrowsNotFoundException()
        {
            // Arrange
            var storyId = Guid.NewGuid();
            var newStory = new Story
            {
                Id = storyId,
                Title = "Test Story",
                Summary = "This is a test story.",
                CoverImage = "http://example.com/image.jpg",
                AgeRange = Core.Models.Enums.AgeRange.Age2To5
            };

            _mockStoryService
                .Setup(service => service.UpdateAsync(storyId, newStory))
                .ThrowsAsync(new InvalidOperationException("Story not found"));

            var controller = new StoriesController(_mockStoryService.Object);

            // Act

            var result = await controller.Put(storyId, newStory);

            // Assert
            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("Story not found", notFound.Value);
            _mockStoryService.Verify(service => service.UpdateAsync(storyId, newStory), Times.Once);
        }


        [Fact]
        public async Task Put_ReturnsBadRequest_WhenServiceThrowsOtherException()
        {
            // Arrange
            var storyId = Guid.NewGuid();
            var newStory = new Story
            {
                Id = storyId,
                Title = "Test Story",
                Summary = "This is a test story.",
                CoverImage = "http://example.com/image.jpg",
                AgeRange = Core.Models.Enums.AgeRange.Age2To5
            };

            _mockStoryService
                .Setup(service => service.UpdateAsync(storyId, newStory))
                .ThrowsAsync(new InvalidOperationException("something went wrong"));

            var controller = new StoriesController(_mockStoryService.Object);

            // Act

            var result = await controller.Put(storyId, newStory);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("something went wrong", badRequest.Value);

            _mockStoryService.Verify(service => service.UpdateAsync(storyId, newStory), Times.Once);
        }

        [Fact]
        public async Task Delete_ReturnsOK_WhenDeletionSucceeds()
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

            _mockStoryService
                .Setup(service => service.DeleteAsync(storyId))
                .ReturnsAsync(true);

            var controller = new StoriesController(_mockStoryService.Object);

            // Act
            var result = await controller.Delete(storyId);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.True((bool)ok.Value);
            _mockStoryService.Verify(service => service.DeleteAsync(storyId), Times.Once);

        }
        [Fact]
        public async Task Delete_ReturnsNotFound_WhenDeletionFails()
        {
            // Arrange 
            var storyId = Guid.NewGuid();

            _mockStoryService
                .Setup(service => service.DeleteAsync(storyId))
                .ReturnsAsync(false); 

            var controller = new StoriesController(_mockStoryService.Object);

            // Act
            var result = await controller.Delete(storyId);

            // Assert
            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("Story not found", notFound.Value);
            _mockStoryService.Verify(service => service.DeleteAsync(storyId), Times.Once);
        }



        [Fact]
        public async Task Delete_ReturnsNotFound_WhenServiceThrowsNotFoundException()
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

            _mockStoryService
                 .Setup(service => service.DeleteAsync(storyId))
                 .ThrowsAsync(new InvalidOperationException("Story not found"));

            var controller = new StoriesController(_mockStoryService.Object);

            // Act 
            var result = await controller.Delete(storyId);

            // Assert
            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("Story not found", notFound.Value);
            _mockStoryService.Verify(service => service.DeleteAsync(storyId), Times.Once);

        }
        [Fact]
        public async Task Delete_ReturnsBadRequest_WhenServiceThrowsOtherException()
        {
            var storyId = Guid.NewGuid();

            _mockStoryService
                .Setup(service => service.DeleteAsync(storyId))
                .ThrowsAsync(new InvalidOperationException("something went wrong"));

            var controller = new StoriesController(_mockStoryService.Object);

            // Act

            var result = await controller.Delete(storyId);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("something went wrong", badRequest.Value);

            _mockStoryService.Verify(service => service.DeleteAsync(storyId), Times.Once);

        }
    }
}
