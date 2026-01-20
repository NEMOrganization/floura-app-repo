using Floura.Core.DTOs;
using Floura.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Floura.Api.Controllers
{
    [ApiController]
    [Route("api/notifications")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _service;

        public NotificationsController(INotificationService service)
        {
            _service = service;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            return Ok(await _service.GetUserNotificationsAsync(userId));
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> Create(Guid userId, CreateNotificationDto dto)
        {
            var notification = await _service.CreateAsync(userId, dto);
            return Ok(notification);
        }

        [HttpPatch("{id}/toggle")]
        public async Task<IActionResult> Toggle(Guid id, [FromQuery] bool enabled)
        {
            await _service.ToggleAsync(id, enabled);
            return NoContent();
        }
    }

}
