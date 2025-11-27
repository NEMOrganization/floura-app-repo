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
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        [MinLength(10)]
        public required string Summary { get; set; }
        [Required]
        public required string CoverImage { get; set; }
        [Required]
        public AgeRange AgeRange { get; set; }

        public List<StoryBits> StoryBits { get; set; } = new();
        

        public Story()
        {

        }
    }
}
