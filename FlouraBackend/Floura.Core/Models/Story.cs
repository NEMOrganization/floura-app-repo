using System;
using System.Collections.Generic;

namespace Floura.Core.Models
{
    public class Story
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Summary { get; set; }
        public string CoverImage { get; set; }

        public List<StoryBits> StoryBits { get; set; } = new();
        public AgeRange AgeRange { get; set; }

        public Story(string title, string summary, AgeRange ageRange, string coverImage)
        {
            Title = title;
            Summary = summary;
            AgeRange = ageRange;
            CoverImage = coverImage;
        }

        public Story()
        {

        }
    }
}
