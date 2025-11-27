using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Floura.Core.Models
{
    public class StoryBits
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public int Order { get; set; }

        public Guid StoryId { get; set; }
        [JsonIgnore]
        public Story? Story { get; set; }

    
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

