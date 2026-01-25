using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Floura.Core.Models.Enums;

namespace Floura.Core.Models
{
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();

        public TimeSpan Time { get; set; }

        public bool IsEnabled { get; set; }

        public NotificationType Type { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }

    }
}
