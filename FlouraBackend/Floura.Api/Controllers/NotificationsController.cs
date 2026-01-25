using Floura.Core.DTOs;
using Floura.Core.Models;
using Floura.Core.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Floura.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        private readonly FlouraDbContext _context;

        public NotificationsController(FlouraDbContext context)
        {
            _context = context;
        }

        // GET: api/notifications
        [HttpGet]
        public async Task<IActionResult> GetUserNotifications()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var notifications = await _context.Notifications
                .Where(n => n.UserId == Guid.Parse(userId))
                .OrderByDescending(n => n.Time)
                .ToListAsync();

            return Ok(notifications);
        }

        // POST: api/notifications
        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            // Tjek om brugeren allerede har denne type
            var exists = await _context.Notifications.AnyAsync(n =>
                n.UserId == Guid.Parse(userId) && n.Type == dto.Type);

            if (exists)
                return BadRequest("Notification type already exists");

            var notification = new Notification
            {
                UserId = Guid.Parse(userId),
                Time = dto.Time,
                Type = dto.Type,
                IsEnabled = true
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return Ok(notification);
        }


        // PATCH: api/notifications/{id}/toggle
        [HttpPatch("{id}/toggle")]
        public async Task<IActionResult> ToggleNotification(Guid id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null) return NotFound();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (notification.UserId != Guid.Parse(userId)) return Forbid();

            notification.IsEnabled = !notification.IsEnabled;
            await _context.SaveChangesAsync();

            return Ok(notification);
        }

        // DELETE: api/notifications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(Guid id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null) return NotFound();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (notification.UserId != Guid.Parse(userId)) return Forbid();

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}

