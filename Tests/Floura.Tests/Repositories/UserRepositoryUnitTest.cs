using Castle.Components.DictionaryAdapter.Xml;
using Floura.Api.Repositories;
using Floura.Core.Models;
using Microsoft.EntityFrameworkCore;
namespace Floura.Tests;
public class UserRepositoryUnitTest
{
    private readonly FlouraDbContext _context;
    private readonly UserRepository _repository;

    public UserRepositoryUnitTest()
    {
       var options = new DbContextOptionsBuilder<FlouraDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new FlouraDbContext(options);
        _repository = new UserRepository(_context);
    }
    [Fact]
    public void Dispose()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Fact]
    public async Task GetAllAsync_ReturnsAllUsers_WhenUsersExist()
    {
        // Arrange 

        var user1 = new User
        {
            Id = Guid.NewGuid(),
            Email = "Test1@test1.com",
            PasswordHash = "test1",
            Language = Core.Models.Enums.Language.Danish
        };

        var user2 = new User
        {
            Id = Guid.NewGuid(),
            Email = "Test2@test2.com",
            PasswordHash = "test2",
            Language = Core.Models.Enums.Language.Danish
        };

        _context.Users.AddRange(user1, user2);
        await _context.SaveChangesAsync();
        
        // Act 
        var result = await _repository.GetAllAsync();

        // Assert 
        var list = result.ToList();
        Assert.Equal(2, list.Count);
        Assert.Contains(list, user => user.Email == "Test1@test1.com");
        Assert.Contains(list, user => user.Email == "Test2@test2.com");
        Assert.All(list, user => Assert.NotNull(user.Children));
    }


    [Fact]
    public async Task GetAllAsync_ReturnsEmptyList_WhenNoUsersExist()
    {
        // Arrange: ingen seed

        // Act 
        var result = await _repository.GetAllAsync();

        // Assert 
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsUser_WithChildren_WhenItExists()
    {
        // Arrange
        var id = Guid.NewGuid();

        var user = new User
        {
            Id = id,
            Email = "Existing user",
            PasswordHash = "Test",
            Language = Core.Models.Enums.Language.Danish
        };

        var child = new Child
        {
            Name = "Jack",
            Age = 3,
            User = user      
        };

        user.Children = new List<Child> { child };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetByIdAsync(id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(id, result!.Id);
        Assert.Equal("Existing user", result.Email);

        Assert.NotNull(result.Children);
        var children = result.Children.ToList();
        Assert.Single(children);

        var c = children.First();
        Assert.Equal("Jack", c.Name);
    }

    [Fact]
    public async Task AddAsync_ThrowsArgumentNullException_WhenUserIsNull()
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(
            () => _repository.AddAsync(null!)
        );
    }

    [Fact]
    public async Task AddAsync_AddsUser_WhenUserIsValid()
    {
        // Arrange
        var userId = Guid.NewGuid();

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = "Test1@test1.com",
            PasswordHash = "test1",
            Language = Core.Models.Enums.Language.Danish
        };

        // Act
        var result = await _repository.AddAsync(user);
        
        // Assert
        Assert.NotNull(result);
        Assert.NotEqual(Guid.Empty, result.Id);

        var dB = await _context.Users.FindAsync(result.Id);
        Assert.NotNull(dB);
    }

    [Fact]
    public async Task UpdateAsync_Update_WhenUserExists()
    {
        var id = Guid.NewGuid();

        var existing = new User
        {
            Id = id,
            Email = "Old email",
            PasswordHash = "Old password",
            Language = Core.Models.Enums.Language.Danish
        };

        _context.Users.Add(existing);
        await _context.SaveChangesAsync();

        var updated = new User
        {
            Id = id,
            Email = "New email",
            PasswordHash = "New password",
            Language = Core.Models.Enums.Language.Danish
        };

        var result = await _repository.UpdateAsync(id, updated);

        Assert.NotNull(result);
        Assert.Equal("New email", result!.Email);
        Assert.Equal("New password", result.PasswordHash);
        Assert.Equal(Core.Models.Enums.Language.Danish, result.Language);

        var fromDb = await _repository.GetByIdAsync(id);

        Assert.NotNull(fromDb);
        Assert.Equal("New email", fromDb!.Email);
        Assert.Equal("New password", fromDb.PasswordHash);
        Assert.Equal(Core.Models.Enums.Language.Danish, fromDb.Language);
    }



    [Fact]
    public async Task UpdateAsync_ReturnsNull_WhenUserDoesNotExist()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var updatedUser = new User
        {
            Id = Guid.NewGuid(),
            Email = "Test1@test1.com",
            PasswordHash = "test1",
            Language = Core.Models.Enums.Language.Danish
        };

        // Act
        var result = await _repository.UpdateAsync(userId, updatedUser);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task DeleteAsync_ReturnsFalse_WhenUserDoesNotExist()
    {
        // Arrange
        var userId = Guid.NewGuid();

        // Act
        var result = await _repository.DeleteAsync(userId);

        // Assert
        Assert.False(result);
    }
}

