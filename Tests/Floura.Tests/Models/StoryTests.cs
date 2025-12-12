using Floura.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Floura.Tests;


public class StoryTests
{
    private List<ValidationResult> Validate(Story story)
    {
        var results = new List<ValidationResult>();
        var context = new ValidationContext(story);
        Validator.TryValidateObject(story, context, results, true);
        return results;
    }

    [Fact]
    public void Story_IsValid_WhenAllFieldsAreCorrect()
    {
        // Arrange
        var story = new Story
        {
            Title = "Historien om Flora",
            Summary = "Dette er en længere og fuldt valid summary.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act
        var results = Validate(story);

        // Assert
        Assert.Empty(results);
    }

    [Fact]
    public void Story_IsInvalid_WhenTitleIsEmpty()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var story = new Story
        {
            Id = storyId,
            Title = "",
            Summary = "This is a valid summary.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act
        var results = Validate(story);

        // Assert
        Assert.Contains(results, title => title.MemberNames.Contains(nameof(Story.Title)));
    }


    [Fact]
    public void Story_IsInvalid_WhenTitleIsNull()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var story = new Story
        {
            Id = storyId,
            Title = null!,
            Summary = "This is a valid summary.",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act
        var results = Validate(story);

        // Assert
        Assert.Contains(results, titleNull => titleNull.MemberNames.Contains(nameof(Story.Title)));
    
    }

    [Fact]
    public void Story_IsInvalid_WhenSummaryIsEmpty()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var story = new Story
        {
            Id = storyId,
            Title = "Uha det er snart jul",
            Summary = "",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act
        var results = Validate(story);

        // Assert
        Assert.Contains(results, summeryIsEmpty => summeryIsEmpty.MemberNames.Contains(nameof(Story.Summary)));
    }
    

    [Fact]
    public void Story_IsInvalid_WhenSummaryTooShort()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var story = new Story
        {
            Id = storyId,
            Title = "Uha det er snart jul",
            Summary = "1",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act
        var results = Validate(story);

        // Assert
        Assert.Contains(results, summeryIsTooShort => summeryIsTooShort.MemberNames.Contains(nameof(Story.Summary)));
    }

    [Fact]
    public void Story_IsInvalid_WhenCoverImageIsEmpty()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var story = new Story
        {
            Id = storyId,
            Title = "Uha det er snart jul",
            Summary = "Dette er en historie om lille Floura",
            CoverImage = "",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act
        var results = Validate(story);

        // Assert
        Assert.Contains(results, coverImageIsEmpty => coverImageIsEmpty.MemberNames.Contains(nameof(Story.CoverImage)));
    }

    [Fact]
    public void Story_IsInvalid_WhenCoverImageIsNull()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var story = new Story
        {
            Id = storyId,
            Title = "Uha det er snart jul",
            Summary = "Dette er en historie om lille Floura",
            CoverImage = null!,
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act
        var results = Validate(story);

        // Assert
        Assert.Contains(results, coverImageIsNull => coverImageIsNull.MemberNames.Contains(nameof(Story.CoverImage)));
    }
  
   

    [Fact]
    public void Story_StoryBits_IsNeverNull()
    {
        // Arrange
        var storyId = Guid.NewGuid();
        var story = new Story
        {
            Id = storyId,
            Title = "Uha det er snart jul",
            Summary = "Dette er en historie om lille Floura",
            CoverImage = "http://example.com/image.jpg",
            AgeRange = Core.Models.Enums.AgeRange.Age2To5
        };

        // Act & Assert
        Assert.NotNull(story.StoryBits);
        Assert.Empty(story.StoryBits);
    }

    
}


