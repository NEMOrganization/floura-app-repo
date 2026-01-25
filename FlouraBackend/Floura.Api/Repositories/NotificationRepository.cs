using Floura.Core.Interfaces;
using Floura.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Floura.Api.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly FlouraDbContext _context;

        public NotificationRepository(FlouraDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Notification>> GetByUserIdAsync(Guid userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .ToListAsync();
        }

        public async Task<Notification?> GetByIdAsync(Guid id)
        {
            return await _context.Notifications.FindAsync(id);
        }

        public async Task AddAsync(Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Notification notification)
        {
            _context.Notifications.Update(notification);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var notification = await GetByIdAsync(id);
            if (notification == null) return;

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
        }
    }

}
