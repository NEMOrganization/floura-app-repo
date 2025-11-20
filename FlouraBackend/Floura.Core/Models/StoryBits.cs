using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Floura.Core.Models
{
    public class StoryBits
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public string Text { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public int Order { get; set; }

        public Guid StoryId { get; set; }
        public Story Story { get; set; }

    
        public StoryBits(string text, string image, int order)
        {
            Text = text;
            Image = image;
            Order = order;
        }

        public StoryBits()
        {

        }

    }
}

