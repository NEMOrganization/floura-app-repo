using System;
using Floura.Core;

namespace Floura.Tests

{
    public class StoryTests
    {

        [Fact]
        public void Title_ShouldNotBeNullOrEmpty()
        {
            var story = new Story { Title = "" };
            Assert.False(story.IsValid());
        }

        [Fact]
        public void Summary_ShouldNotBeNullOrEmpty()
        {
            var story = new Story { Summary = "" };
            Assert.False(story.IsValid());
        }

    }
}

