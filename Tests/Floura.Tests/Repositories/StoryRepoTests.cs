//using Xunit;
//using System.Collections.Generic;

//public class StoryRepositoryTests
//{
//    [Fact]
//    public void Add_ShouldAddStoryToRepository()
//    {
//        // Arrange
//        var repo = new StoryRepository();
//        var story = new Story { Title = "Test", Summary = "Summary" };

//        // Act
//        repo.Add(story);

//        // Assert
//        var all = repo.GetAll();
//        Assert.Single(all);
//        Assert.Equal("Test", all[0].Title);
//    }

//    [Fact]
//    public void GetById_ShouldReturnCorrectStory()
//    {
//        // Arrange
//        var repo = new StoryRepository();
//        var story = new Story { Id = 1, Title = "A" };
//        repo.Add(story);

//        // Act
//        var result = repo.GetById(1);

//        // Assert
//        Assert.NotNull(result);
//        Assert.Equal("A", result.Title);
//    }

//    [Fact]
//    public void Delete_ShouldRemoveStory()
//    {
//        // Arrange
//        var repo = new StoryRepository();
//        var story = new Story { Id = 1 };
//        repo.Add(story);

//        // Act
//        repo.Delete(1);

//        // Assert
//        Assert.Empty(repo.GetAll());
//    }
//}

