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
        public ActionResult<IEnumerable<Story>> GetAll()
        {
            IEnumerable<Story> stories = _storyService.GetAll();

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
        public ActionResult<Story> Get(Guid id)
        {
            Story? story = _storyService.GetById(id);

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
        public ActionResult Post([FromBody] Story story)
        {
            if (story == null)
                return BadRequest("Story object can't be null");

            try
            {
                Story? newStory = _storyService.Create(story);
                // Returnér 201 Created, ligesom du gør med fuglene
                return Created("", newStory);
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
        public ActionResult<Story> Put(Guid id, [FromBody] Story value)
        {
            try
            {
                Story? updatedStory = _storyService.Update(id, value);
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
        public ActionResult<Story> Delete(Guid id)
        {
            try
            {
                Story? deleted = _storyService.Delete(id);
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
