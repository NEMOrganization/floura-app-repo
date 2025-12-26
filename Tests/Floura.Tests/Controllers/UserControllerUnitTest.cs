using Floura.Api.Controllers;
using Floura.Core.Interfaces;
using Floura.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Floura.Tests.Controllers
{
    public class UserControllerUnitTest
    {
        private readonly Mock<IUserService> _mockUserService;

        public UserControllerUnitTest()
        {
            _mockUserService = new Mock<IUserService>();
        }

        [Fact]
        public async Task GetAll_ReturnsOK_WhenUsersExist()
        {
            // Arrange

            var userId = Guid.NewGuid();

            var listOfUsers = new List<User>
            {
                new User
                {
                  Id = userId,
                  Email = "Test1@test.com",
                  PasswordHash = "test1",
                  Language = Core.Models.Enums.Language.Danish
                },
                new User
                {
                  Id = userId,
                  Email = "Test2@test.com",
                  PasswordHash = "test2",
                  Language = Core.Models.Enums.Language.Danish
                }
            };

            _mockUserService
                .Setup(service => service.GetAllAsync())
                .ReturnsAsync(listOfUsers);

            var userController = new UsersController(_mockUserService.Object);


            // Act
            var result = await userController.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedUsers = Assert.IsAssignableFrom<IEnumerable<User>>(okResult.Value);

            Assert.Equal(2, returnedUsers.Count());
            _mockUserService.Verify(service => service.GetAllAsync(), Times.Once);
        }

        [Fact]
        public async Task GetAll_ReturnsNotFound_WhenNoUsersExist()
        {
            // Arrange
            var emptyList = new List<User>();

            _mockUserService
                .Setup(service => service.GetAllAsync())
                .ReturnsAsync(emptyList);

            var userController = new UsersController(_mockUserService.Object);

            // Act
            var result = await userController.GetAll();

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("The list is empty", notFoundResult.Value);
            _mockUserService.Verify(service => service.GetAllAsync(), Times.Once);
        }

        [Fact]
        public async Task Get_ReturnsOK_WhenUserExists()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                Email = "Test1@test.com",
                PasswordHash = "test1",
                Language = Core.Models.Enums.Language.Danish
            };

            _mockUserService
                .Setup(service => service.GetByIdAsync(userId))
                .ReturnsAsync(user);

            var userController = new UsersController(_mockUserService.Object);

            // Act 
            var result = await userController.Get(userId);

            // Assert 
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedUser = Assert.IsType<User>(okResult.Value);

            Assert.Equal(userId, returnedUser.Id);
            Assert.Equal("Test1@test.com", returnedUser.Email);

            _mockUserService.Verify(u => u.GetByIdAsync(userId), Times.Once);
        }


        [Fact]
        public async Task Get_ReturnsNotFound_WhenUserDoesNotExistById()
        {
            // Arrange
            var userId = Guid.NewGuid();

            _mockUserService
                .Setup(service => service.GetByIdAsync(userId))
                .ReturnsAsync((User?)null);

            var userController = new UsersController(_mockUserService.Object);

            // Act 
            var result = await userController.Get(userId);

            // Assert 
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("The id does not exist", notFoundResult.Value);
            _mockUserService.Verify(service => service.GetByIdAsync(userId), Times.Once);

        }
        [Fact]
        public async Task Post_ReturnsBadRequest_WhenUserIsNull()
        {
            // Arrange
            User? nullUser = null;
            var controller = new UsersController(_mockUserService.Object);

            // Act
            var result = await controller.Post(nullUser);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("User can't be null", badRequestResult.Value);
            _mockUserService.Verify(service => service.CreateAsync(It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async Task Post_ReturnsCreated_WhenUserIsValid()
        {
            // Arrange 
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                Email = "Test1@test.com",
                PasswordHash = "test1",
                Language = Core.Models.Enums.Language.Danish
            };

            _mockUserService
                .Setup(service => service.CreateAsync(user))
                .ReturnsAsync(user);

            var userController = new UsersController(_mockUserService.Object);

            // Act
            var result = await userController.Post(user);


            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnedStory = Assert.IsType<User>(createdResult.Value);

            Assert.Equal(userId, returnedStory.Id);
            _mockUserService.Verify(service => service.CreateAsync(user), Times.Once);
        }

        [Fact]
        public async Task Post_ReturnsBadRequest_WhenServiceThrowsException()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var newUser = new User
            {
                Id = userId,
                Email = "Test1@test.com",
                PasswordHash = "test1",
                Language = Core.Models.Enums.Language.Danish
            };

            _mockUserService
                .Setup(service => service.CreateAsync(newUser))
                .ThrowsAsync(new InvalidOperationException("something went wrong"));

            var controller = new UsersController(_mockUserService.Object);

            // Act 
            var result = await controller.Post(newUser);

            // Assert 
            var BadRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("something went wrong", BadRequest.Value);

            _mockUserService.Verify(service => service.CreateAsync(newUser), Times.Once);
        }

        [Fact]
        public async Task Put_ReturnsOK_WhenUpdateSucceeds()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var updatedUser = new User
            {
                Id = userId,
                Email = "Test1@test.com",
                PasswordHash = "test1",
                Language = Core.Models.Enums.Language.Danish
            };

            _mockUserService
                .Setup(service => service.UpdateAsync(userId, updatedUser))
                .ReturnsAsync(updatedUser);

            var controller = new UsersController(_mockUserService.Object);

            // Act 
            var result = await controller.Put(userId, updatedUser);


            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var user = Assert.IsType<User>(okResult.Value);

            Assert.Equal(updatedUser.Id, user.Id);
            _mockUserService.Verify(service => service.UpdateAsync(userId, updatedUser), Times.Once);

        }
        [Fact]
        public async Task Put_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var existingUser = new User
            {
                Id = userId,
                Email = "Test1@test.com",
                PasswordHash = "test1",
                Language = Core.Models.Enums.Language.Danish
            };

            _mockUserService
                .Setup(service => service.UpdateAsync(userId, existingUser))
                .ReturnsAsync((User?)null);

            var controller = new UsersController(_mockUserService.Object);

            // Act
            var result = await controller.Put(userId, existingUser);

            // Assert 
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("User is not found", notFoundResult.Value);
            _mockUserService.Verify(service => service.UpdateAsync(userId, existingUser), Times.Once);
        }

        [Fact]
        public async Task Put_ReturnsNotFound_WhenServiceThrowsNotFoundException()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var newUser = new User
            {
                Id = userId,
                Email = "Test1@test.com",
                PasswordHash = "test1",
                Language = Core.Models.Enums.Language.Danish
            };

            _mockUserService
                .Setup(service => service.UpdateAsync(userId, newUser))
                .ThrowsAsync(new InvalidOperationException("User is not found"));

            var controller = new UsersController(_mockUserService.Object);

            // Act

            var result = await controller.Put(userId, newUser);

            // Assert
            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("User is not found", notFound.Value);
            _mockUserService.Verify(service => service.UpdateAsync(userId, newUser), Times.Once);
        }


        [Fact]
        public async Task Put_ReturnsBadRequest_WhenServiceThrowsOtherException()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var newUser = new User
            {
                Id = userId,
                Email = "Test1@test.com",
                PasswordHash = "test1",
                Language = Core.Models.Enums.Language.Danish
            };

            _mockUserService
                .Setup(service => service.UpdateAsync(userId, newUser))
                .ThrowsAsync(new InvalidOperationException("something went wrong"));

            var controller = new UsersController(_mockUserService.Object);

            // Act

            var result = await controller.Put(userId, newUser);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("something went wrong", badRequest.Value);

            _mockUserService.Verify(service => service.UpdateAsync(userId, newUser), Times.Once);
        }

        [Fact]
        public async Task Delete_ReturnsOK_WhenDeletionSucceeds()
        {
            // Arrange
            var userId = Guid.NewGuid();

            _mockUserService
                .Setup(service => service.DeleteAsync(userId))
                .ReturnsAsync(true);

            var controller = new UsersController(_mockUserService.Object);

            // Act
            var result = await controller.Delete(userId);

            // Assert
            var ok = Assert.IsType<OkObjectResult>(result.Result);
            Assert.True((bool?)ok.Value);
            _mockUserService.Verify(service => service.DeleteAsync(userId), Times.Once);

        }
        [Fact]
        public async Task Delete_ReturnsNotFound_WhenDeletionFails()
        {
            // Arrange 
            var userId = Guid.NewGuid();

            _mockUserService
                .Setup(service => service.DeleteAsync(userId))
                .ReturnsAsync(false);

            var controller = new UsersController(_mockUserService.Object);

            // Act
            var result = await controller.Delete(userId);

            // Assert
            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("User is not found", notFound.Value);
            _mockUserService.Verify(service => service.DeleteAsync(userId), Times.Once);
        }



        [Fact]
        public async Task Delete_ReturnsNotFound_WhenServiceThrowsNotFoundException()
        {
            // Arrange
            var userId = Guid.NewGuid();

            _mockUserService
                 .Setup(service => service.DeleteAsync(userId))
                 .ThrowsAsync(new InvalidOperationException("User is not found"));

            var controller = new UsersController(_mockUserService.Object);

            // Act 
            var result = await controller.Delete(userId);

            // Assert
            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("User is not found", notFound.Value);
            _mockUserService.Verify(service => service.DeleteAsync(userId), Times.Once);

        }
        [Fact]
        public async Task Delete_ReturnsBadRequest_WhenServiceThrowsOtherException()
        {
            var userId = Guid.NewGuid();

            _mockUserService
                .Setup(service => service.DeleteAsync(userId))
                .ThrowsAsync(new InvalidOperationException("something went wrong"));

            var controller = new UsersController(_mockUserService.Object);

            // Act

            var result = await controller.Delete(userId);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("something went wrong", badRequest.Value);

            _mockUserService.Verify(service => service.DeleteAsync(userId), Times.Once);

        }
    }
}
