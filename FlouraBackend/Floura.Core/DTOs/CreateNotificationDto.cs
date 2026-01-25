using Floura.Core.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Floura.Core.DTOs
{
    public class CreateNotificationDto
    {
        public string Time { get; set; }
        public NotificationType Type { get; set; }
    }

}
