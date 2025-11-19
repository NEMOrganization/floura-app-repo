using Floura.Core.Interfaces;
using Floura.Core.Models;

namespace Floura.Api.Repositories
{
    // In-memory repository til test uden database lige nu, ved ikke om det er relevant
    public class StoryRepository : IStoryRepository
    {
        private readonly List<Story> _stories = new();

        public StoryRepository()
        {
            // testdata 
            _stories.Add(new Story("En morgentur i dalen", "Morgentandbørstning historie", AgeRange.Age2To5, "billede1.png"));
            _stories.Add(new Story("En tur ind i mørket", "Aften tandbørstning", AgeRange.Age2To5, "billede2.png"));
        }

        public Story? Add(Story story)
        {
            if (story == null)
                throw new ArgumentNullException("Story cannot be null");

            try
            {
                if (story.Id == Guid.Empty)
                    story.Id = Guid.NewGuid();

                _stories.Add(story);
                return story;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding story: " + ex.Message);
                return null;
            }
        }

        public IEnumerable<Story> GetAll()
        {
            return new List<Story>(_stories); // returnere en kopi af listen
        }

        public Story? GetById(Guid id)
        {
            return _stories.FirstOrDefault(s => s.Id == id);
        }

        public Story? Update(Guid id, Story updatedStory)
        {
            Story? existing = GetById(id);
            if (existing == null)
                throw new ArgumentException("No Id match");

            existing.Title = updatedStory.Title;
            existing.Summary = updatedStory.Summary;
            existing.CoverImage = updatedStory.CoverImage;
            existing.AgeRange = updatedStory.AgeRange;
            existing.StoryBits = updatedStory.StoryBits;

            return existing;
        }

        public Story? RemoveById(Guid id)
        {
            try
            {
                Story? story = GetById(id);
                if (story == null) return null;

                _stories.Remove(story);
                return story;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error removing story: " + ex.Message);
                return null;
            }
        }
    }
}
