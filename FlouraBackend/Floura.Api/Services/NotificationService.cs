using Floura.Core.DTOs;
using Floura.Core.Interfaces;
using Floura.Core.Models;

namespace Floura.Api.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repository;

        public NotificationService(INotificationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Notification>> GetUserNotificationsAsync(Guid userId)
        {
            return await _repository.GetByUserIdAsync(userId);
        }

        public async Task<Notification> CreateAsync(Guid userId, CreateNotificationDto dto)
        {
            // Kun én Morning og én Evening pr. bruger
            var existing = await _repository.GetByUserIdAsync(userId);

            if (existing.Any(n => n.Type == dto.Type))
                throw new InvalidOperationException("Notification type already exists");

            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Time = dto.Time,
                Type = dto.Type,
                IsEnabled = true
            };

            await _repository.AddAsync(notification);
            return notification;
        }
        public async Task ToggleAsync(Guid notificationId, bool isEnabled)
        {
            var notification = await _repository.GetByIdAsync(notificationId);
            if (notification == null)
                throw new KeyNotFoundException("Notification not found");

            notification.IsEnabled = isEnabled;
            await _repository.UpdateAsync(notification);
        }

        public async Task DeleteAsync(Guid notificationId)
        {
            await _repository.DeleteAsync(notificationId);
        }
    }

}
