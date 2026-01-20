using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Floura.Core.Interfaces;
using Floura.Core.Models;
using Floura.Core.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace Floura.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : Controller
    {

        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            var users = await _userService.GetAllAsync();

            if (!users.Any())
            {
                return NotFound("The list is empty");
            }

            return Ok(users);
        }


        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<User>> Get(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound("The id does not exist");
            }

            return Ok(user);
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<User>> Post([FromBody] User? user)
        {
            if (user == null)
                return BadRequest("User can't be null");

            try
            {
                if (user.Children != null)
                {
                    foreach (var child in user.Children)
                    {
                        child.User = user;  // EF Core kræver non-null User reference
                    }
                }

                var newUser = await _userService.CreateAsync(user);

                return CreatedAtAction(
                    nameof(Get),
                    new { id = newUser.Id },
                    newUser
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPut("{id}")]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<User>> Put(Guid id, [FromBody] User value)
        {
            try
            {
                var updatedUser = await _userService.UpdateAsync(id, value);

                if (updatedUser == null)
                    return NotFound("User is not found");

                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<User>> Delete(Guid id)
        {
            try
            {
                var deleted = await _userService.DeleteAsync(id);

                if (!deleted)
                    return NotFound("User is not found");

                return Ok(deleted);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(ex.Message);

                return BadRequest(ex.Message);
            }
        }
    }
}
