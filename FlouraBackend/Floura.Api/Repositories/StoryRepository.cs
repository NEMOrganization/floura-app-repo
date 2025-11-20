using Floura.Core.Interfaces;
using Floura.Core.Models;
using Floura.Core.Models.Enums;

namespace Floura.Api.Repositories
{
    // In-memory repository til test uden database lige nu
    public class StoryRepository : IStoryRepository
    {
        private readonly List<Story> _stories = new();

        public StoryRepository()
        {
            // testdata
            _stories.Add(new Story("En morgentur i dalen", "Morgentandbørstning historie", AgeRange.Age2To5, "billede1.png"));
            _stories.Add(new Story("En tur ind i mørket", "Aften tandbørstning", AgeRange.Age2To5, "billede2.png"));
        }

        public async Task<Story> AddAsync(Story story)
        {
            if (story == null)
                throw new ArgumentNullException("Story cannot be null");

            if (story.Id == Guid.Empty)
                story.Id = Guid.NewGuid();

            _stories.Add(story);
            return story;
        }

        public async Task<IEnumerable<Story>> GetAllAsync()
        {
            return new List<Story>(_stories);
        }

        public Task<Story?> GetByIdAsync(Guid id)
        {
            Story? story = _stories.FirstOrDefault(s => s.Id == id);
            return Task.FromResult(story);
        }

        public Task<Story?> UpdateAsync(Guid id, Story updatedStory)
        {
            Story? existing = _stories.FirstOrDefault(s => s.Id == id);
            if (existing == null)
                return Task.FromResult<Story?>(null);

            existing.Title = updatedStory.Title;
            existing.Summary = updatedStory.Summary;
            existing.CoverImage = updatedStory.CoverImage;
            existing.AgeRange = updatedStory.AgeRange;
            existing.StoryBits = updatedStory.StoryBits;

            return Task.FromResult<Story?>(existing);
        }

        public Task<bool> DeleteAsync(Guid id)
        {
            Story? story = _stories.FirstOrDefault(s => s.Id == id);
            if (story == null)
                return Task.FromResult(false);

            _stories.Remove(story);
            return Task.FromResult(true);
        }
    }
}
