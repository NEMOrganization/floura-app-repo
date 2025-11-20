using Floura.Core.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Floura.Core.Models
{
    public class Story
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Title { get; set; }
        [Required]
        [MinLength(10)]
        public string Summary { get; set; }
        [Required]
        public string CoverImage { get; set; }
        [Required]
        public AgeRange AgeRange { get; set; }

        public List<StoryBits> StoryBits { get; set; } = new();
        

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
