//using System;
//using Floura.Core;

//namespace Floura.Tests

//{   //skal have lavet en IsValid metode inde i Story.cs for at testen ikke fejler
//    public class StoryTests
//    {

//        [Fact]
//        public void Title_ShouldNotBeNullOrEmpty()
//        {
//            //Act
//            var story = new Story 
//            { 
//                Title = "" 
//                Summary = "Summary test"
//                CoverImage = "ImageURL"
//                AgeRange = 3
//                StoryBits = {new StoryBit() }
            
//            };

//            Assert.False(story.IsValid());
//        }

//        [Fact]
//        public void Summary_ShouldNotBeNullOrEmpty()
//        {
//            var story = new Story
//            {
//                Title = "My Title",
//                Summary = "",
//                CoverImage = "ImageURL"
//                AgeRange = 3,
//                StoryBits = { new StoryBit() }
//            };

//            Assert.False(story.IsValid());
//        }

//        [Fact]
//        public void CoverImage_ShouldNotBeNullOrEmpty()
//        {
//            var story = new StoryTests
//            {
//                Title = "My Title",
//                Summary = "",
//                CoverImage = ""
//                AgeRange = 3,
//                StoryBits = { new StoryBit() }
//            };

//            Assert.False(story.IsValid());
//        }

//        [Fact]
//        public void Story_ShouldBeValid_WhenAllFieldsAreCorrect()
//        {
//            var story = new Story
//            {
//                Title = "My title",
//                Summary = "Summary Test",
//                CoverImage = "ImageURL"
//                AgeRange = 3,
//                StoryBits = { new StoryBit() }
//            };

//            Assert.True(story.IsValid());
//        }

//    }
//}



