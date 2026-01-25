using Floura.Core.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Floura.Core.DTOs
{
    public class NotificationDto
    {
        public Guid Id { get; set; }
        public string Time { get; set; }
        public bool IsEnabled { get; set; }
        public NotificationType Type { get; set; }
    }

}
