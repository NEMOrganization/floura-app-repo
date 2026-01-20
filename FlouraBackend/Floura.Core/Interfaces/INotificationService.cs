using Floura.Core.DTOs;
using Floura.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Floura.Core.Interfaces
{
    public interface INotificationService
    {
        Task<IEnumerable<Notification>> GetUserNotificationsAsync(Guid userId);
        Task<Notification> CreateAsync(Guid userId, CreateNotificationDto dto);
        Task ToggleAsync(Guid notificationId, bool isEnabled);
        Task DeleteAsync(Guid notificationId);
    }

}
