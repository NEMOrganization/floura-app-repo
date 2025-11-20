using Floura.Core.Interfaces;
using Floura.Core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Floura.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        private readonly IStoryService _storyService; 


        // Dependency Injection 
        public StoriesController(IStoryService storyService)
        {
            _storyService = storyService;
        }

        // GET: api/Stories
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<IEnumerable<Story>>> GetAll()
        {
            var stories = await _storyService.GetAllAsync();

            if (!stories.Any())
            {
                return NotFound("The list is empty");
            }

            return Ok(stories);
        }

        // GET: api/Stories/{id}
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<Story>> Get(Guid id)
        {
            var story = await _storyService.GetByIdAsync(id);

            if (story == null)
            {
                return NotFound("The id does not exist");
            }

            return Ok(story);
        }

        // POST: api/Stories
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<Story>> Post([FromBody] Story story)
        {
            if (story == null)
                return BadRequest("Story object can't be null");

            try
            {
                var newStory = await _storyService.CreateAsync(story);

                // 201 Created + Location header
                return CreatedAtAction(
                    nameof(Get),
                    new { id = newStory.Id },
                    newStory
                );
            }
            catch (Exception ex)
            {
                // StoryService smider exceptions ved valideringsfejl
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Stories/{id}
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPut("{id}")]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<Story>> Put(Guid id, [FromBody] Story value)
        {
            try
            {
                var updatedStory = await _storyService.UpdateAsync(id, value);

                if (updatedStory == null)
                    return NotFound("Story not found");

                return Ok(updatedStory);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(ex.Message);

                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Stories/{id}
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        [EnableCors("MyAllowSpecificOrigins")]
        public async Task<ActionResult<Story>> Delete(Guid id)
        {
            try
            {
                var deleted = await _storyService.DeleteAsync(id);

                if (deleted == null)
                    return NotFound("Story not found");

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
