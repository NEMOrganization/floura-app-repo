using Floura.Core.DTOs;
using Floura.Core.Models;
using Floura.Core.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Floura.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("MyAllowSpecificOrigins")]
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
                .OrderBy(n => n.Time)
                .ToListAsync();

            // Return DTO med Time som "HH:mm"
            var dtoList = notifications.Select(n => new NotificationDto
            {
                Id = n.Id,
                Type = n.Type,
                Time = n.Time.ToString(@"hh\:mm"), // fx "06:30"
                IsEnabled = n.IsEnabled
            }).ToList();

            return Ok(dtoList);
        }

        // POST: api/notifications
        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            // Konverter tid fra "HH:mm" til TimeSpan
            if (!TimeSpan.TryParse(dto.Time, out TimeSpan time))
                return BadRequest("Invalid time format. Expected HH:mm");

            // Tjek om brugeren allerede har en notifikation af denne type
            var exists = await _context.Notifications
                .AnyAsync(n => n.UserId == Guid.Parse(userId) && n.Type == dto.Type);

            if (exists)
                return BadRequest("Du har allerede en notifikation af denne type.");

            var notification = new Notification
            {
                UserId = Guid.Parse(userId),
                Time = time,
                Type = dto.Type,
                IsEnabled = true
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            var resultDto = new NotificationDto
            {
                Id = notification.Id,
                Type = notification.Type,
                Time = notification.Time.ToString(@"hh\:mm"),
                IsEnabled = notification.IsEnabled
            };

            return Ok(resultDto);
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

            var resultDto = new NotificationDto
            {
                Id = notification.Id,
                Type = notification.Type,
                Time = notification.Time.ToString(@"hh\:mm"),
                IsEnabled = notification.IsEnabled
            };

            return Ok(resultDto);
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


