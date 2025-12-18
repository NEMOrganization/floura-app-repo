using Floura.Core.Interfaces;
using Floura.Core.Models;
using Floura.Core.Services;
using Moq;
using System.Collections.Generic;
using System.Reflection.PortableExecutable;
using Xunit.Sdk;
namespace Floura.Tests;

public class UserServiceUnitTest
{
    private readonly Mock<IUserRepository> _mockUserRepository;

    public UserServiceUnitTest()
    {
        _mockUserRepository = new Mock<IUserRepository>(MockBehavior.Strict);
    }

    [Fact]
    public async Task CreateAsync_ShouldCreateUser_Successfully()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var newUser = new User
        {
            Id = userId,
            Email = "Test@test.com",
            PasswordHash = "Test123",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
        .Setup(repo => repo.AddAsync(newUser))
        .ReturnsAsync(newUser);

        var userService = new UserService(_mockUserRepository.Object); // dette er vores SUT objekt

        // Act 
        var result = await userService.CreateAsync(newUser);

        // Assert
        Assert.NotNull(result);
        Assert.Same(newUser, result);
        Assert.Equal(newUser.Id, result.Id);
        _mockUserRepository.Verify(repo => repo.AddAsync(newUser), Times.Once);
    }

    [Fact]
    public async Task CreateAsync_ShouldThrowArgumentNullException_WhenUserIsNull()
    {
        // Arrange 
        var userService = new UserService(_mockUserRepository.Object);

        // Act & Assert
        var ex = await Assert.ThrowsAsync<ArgumentNullException>(() => userService.CreateAsync(null!));
        Assert.Equal("user", ex.ParamName);
        _mockUserRepository.Verify(repo => repo.AddAsync(It.IsAny<User>()), Times.Never);
    }

    [Fact]
    public async Task CreateAsync_ShouldPropagateException_WhenRepositoryThrows()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var newUser = new User
        {
            Id = userId,
            Email = "Test@test.com",
            PasswordHash = "Test123",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
       .Setup(repo => repo.AddAsync(newUser))
       .ThrowsAsync(new InvalidOperationException("error"));

        var userService = new UserService(_mockUserRepository.Object);

        // Act & Assert 
        await Assert.ThrowsAsync<InvalidOperationException>(() => userService.CreateAsync(newUser));
        _mockUserRepository.Verify(repo => repo.AddAsync(newUser), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnUser_WhenUserExists()
    {
        // Arrange 
        var userId = Guid.NewGuid();
        var existingUser = new User
        {
            Id = userId,
            Email = "Test@test.com",
            PasswordHash = "Test123",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(userId))
            .ReturnsAsync(existingUser);

        var userService = new UserService(_mockUserRepository.Object);

        // Act
        var result = await userService.GetByIdAsync(userId);

        // Assert 
        Assert.NotNull(result);
        Assert.Equal(existingUser.Id, result.Id);
        Assert.Equal(existingUser.Email, result.Email);
        _mockUserRepository.Verify(repo => repo.GetByIdAsync(userId), Times.Once);

    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnNull_WhenUserDoesNotExist()
    {
        // Arrange
        var userId = Guid.NewGuid();

        _mockUserRepository
        .Setup(repo => repo.GetByIdAsync(userId))
        .ReturnsAsync((User?)null);

        var userService = new UserService(_mockUserRepository.Object);

        // Act 
        var result = await userService.GetByIdAsync(userId);

        // Assert
        Assert.Null(result);
        _mockUserRepository.Verify(repo => repo.GetByIdAsync(userId), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldCallRepositoryOnce_WithSameId()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var existingUser = new User
        {
            Id = userId,
            Email = "Test@test.com",
            PasswordHash = "Test123",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
        .Setup(repo => repo.GetByIdAsync(userId))
        .ReturnsAsync(existingUser);

        var userService = new UserService(_mockUserRepository.Object);

        // Act
        var result = await userService.GetByIdAsync(userId);

        // Assert
        Assert.NotNull(result);
        _mockUserRepository.Verify(repo => repo.GetByIdAsync(It.Is<Guid>(id => id == userId)), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldPropagateException_WhenRepositoryThrows()
    {
        // Arrange 
        var userId = Guid.NewGuid();

        _mockUserRepository
          .Setup(repo => repo.GetByIdAsync(userId))
          .ThrowsAsync(new InvalidOperationException("error"));

        var userService = new UserService(_mockUserRepository.Object);

        // Act & Assert 
        await Assert.ThrowsAsync<InvalidOperationException>(() => userService.GetByIdAsync(userId));
        _mockUserRepository.Verify(repo => repo.GetByIdAsync(userId), Times.Once);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnUsers_WhenUsersExist()
    {
        // Arrange
        var listOfUsers = new List<User>
    {
        new User
        {
            Id = userId,
            Email = "Test1@test.com",
            PasswordHash = "Test1",
            Language = Core.Models.Enums.Language.Danish
        },
        new User
        {
            Id = userId,
            Email = "Test2@test.com",
            PasswordHash = "Test2",
            Language = Core.Models.Enums.Language.Danish
        }
    };

        _mockUserRepository
            .Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(listOfUsers);

        var userService = new UserService(_mockUserRepository.Object);

        // Act
        var result = await userService.GetAllAsync();

        // Assert
        Assert.NotNull(result);

        var resultList = result.ToList();
        Assert.Equal(listOfUsers.Count, resultList.Count);
        Assert.Equal(listOfUsers[0].Id, resultList[0].Id);
        Assert.Equal(listOfUsers[1].Id, resultList[1].Id);

        _mockUserRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
    }


    [Fact]
    public async Task GetAllAsync_ShouldReturnEmptyList_WhenNoUsersExist()
    {
        // Arrange
        var emptyList = new List<User>();

        _mockUserRepository
            .Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(emptyList);

        var userService = new UserService(_mockUserRepository.Object);

        // Act
        var result = await userService.GetAllAsync();

        // Assert
        Assert.Empty(result);
        _mockUserRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task GetAllAsync_ShouldPropagateException_WhenRepositoryThrows()
    {
        // Arrange
        var newUserList = new List<User>();

        _mockUserRepository
            .Setup(repo => repo.GetAllAsync())
            .ThrowsAsync(new InvalidOperationException("error"));

        var userService = new UserService(_mockUserRepository.Object);

        // Act & Assert 
        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            userService.GetAllAsync()
        );

        _mockUserRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdateAndReturnUser_WhenUserExists()
    {
        // Arrange
        var userId = Guid.NewGuid();

        var existingUser = new User
        {
            Id = userId,
            Email = "Old email",
            PasswordHash = "Old password",
            Language = Core.Models.Enums.Language.Danish
        };

        var updatedUser = new User
        {
            Id = userId,
            Email = "New email",
            PasswordHash = "New password",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(userId))
            .ReturnsAsync(existingUser);

        _mockUserRepository
            .Setup(repo => repo.UpdateAsync(userId, updatedUser))
            .ReturnsAsync(updatedUser);

        var userService = new UserService(_mockUserRepository.Object);

        // Act
        var result = await userService.UpdateAsync(userId, updatedUser);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(updatedUser, result);

        _mockUserRepository.Verify(repo => repo.GetByIdAsync(userId), Times.Once);
        _mockUserRepository.Verify(repo => repo.UpdateAsync(userId, updatedUser), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_ShouldReturnNull_WhenUserDoesNotExist()
    {
        // Arrange
        var userId = Guid.NewGuid();

        var updatedUser = new User
        {
            Id = userId,
            Email = "New email",
            PasswordHash = "New password",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(userId))
            .ReturnsAsync((User?)null);

        var userService = new UserService(_mockUserRepository.Object);

        // Act
        var result = await userService.UpdateAsync(userId, updatedUser);

        // Assert
        Assert.Null(result);

        _mockUserRepository.Verify(repo => repo.GetByIdAsync(userId), Times.Once);
        _mockUserRepository.Verify(repo => repo.UpdateAsync(It.IsAny<Guid>(), It.IsAny<User>()), Times.Never);
    }

    [Fact]
    public async Task UpdateAsync_ShouldPropagateException_WhenGetByIdAsyncThrows()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var updatedUser = new User
        {
            Id = userId,
            Email = "New email",
            PasswordHash = "New password",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(userId))
            .ThrowsAsync(new InvalidOperationException("error"));

        var userService = new UserService(_mockUserRepository.Object);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            userService.UpdateAsync(userId, updatedUser));

        _mockUserRepository.Verify(
            repo => repo.UpdateAsync(It.IsAny<Guid>(), It.IsAny<User>()),
            Times.Never
        );
    }

    [Fact]
    public async Task UpdateAsync_ShouldPropagateException_WhenUpdateAsyncThrows()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var exsintingUser = new User
        {
            Id = userId,
            Email = "New email",
            PasswordHash = "New password",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(userId))
            .ReturnsAsync(exsintingUser);

        _mockUserRepository
            .Setup(repo => repo.UpdateAsync(userId, exsintingUser))
            .ThrowsAsync(new InvalidOperationException("error"));

        var service = new UserService(_mockUserRepository.Object);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() =>
            service.UpdateAsync(userId, exsintingUser));

        _mockUserRepository.Verify(repo => repo.GetByIdAsync(userId), Times.Once);
        _mockUserRepository.Verify(repo => repo.UpdateAsync(userId, exsintingUser), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_ShouldDeleteAndReturnTrue_WhenUserExists()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var exsintingUser = new User
        {
            Id = userId,
            Email = "New email",
            PasswordHash = "New password",
            Language = Core.Models.Enums.Language.Danish
        };

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(userId))
            .ReturnsAsync(exsintingUser);

        _mockUserRepository
            .Setup(repo => repo.DeleteAsync(userId))
            .ReturnsAsync(true);

        var service = new UserService(_mockUserRepository.Object);

        // Act
        var result = await service.DeleteAsync(userId);


        // Assert
        Assert.True(result);
        _mockUserRepository.Verify(repo => repo.DeleteAsync(userId), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_ShouldReturnFalse_WhenUserDoesNotExist()
    {
        // Arrange 
        var userId = Guid.NewGuid();

        _mockUserRepository
            .Setup(repo => repo.GetByIdAsync(userId))
            .ReturnsAsync((User?)null);

        var service = new UserService(_mockUserRepository.Object);

        // Act 
        var result = await service.DeleteAsync(userId);

        // Assert
        Assert.False(result);
        _mockUserRepository.Verify(repo => repo.GetByIdAsync(userId), Times.Once);
        _mockUserRepository.Verify(repo => repo.DeleteAsync(It.IsAny<Guid>()), Times.Never);
    }

    [Fact]
    public async Task DeleteAsync_ShouldPropagateException_WhenDeleteAsyncThrows()
    {

        // Arrange
        var userId = Guid.NewGuid();
        var existingUser = new Story
        {
            Id = userId,
            Title = "New Title",
            Summary = "New summary",
            CoverImage = "new.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        _mockStoryRepository
            .Setup(repo => repo.GetByIdAsync(userId))
            .ReturnsAsync(existingUser);

        _mockStoryRepository
            .Setup(repo => repo.DeleteAsync(userId))
            .ThrowsAsync(new InvalidOperationException("error Delete"));

        var service = new StoryService(_mockStoryRepository.Object);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => service.DeleteAsync(userId));

        _mockStoryRepository.Verify(repo => repo.GetByIdAsync(userId), Times.Once);
        _mockStoryRepository.Verify(repo => repo.DeleteAsync(userId), Times.Once);
    }
}

