using Floura.Core.Interfaces;
using Floura.Core.Models;
using Floura.Core.Models.Enums;

namespace Floura.Core.Services
{
    public class StoryService : IStoryService
    {
        private readonly IStoryRepository _repository;

        public StoryService(IStoryRepository repository)
        {
            _repository = repository;
        }

        public Story? Create(Story story)
        {
            if (story == null)
                throw new ArgumentNullException(nameof(story), "Story cannot be null.");

            if (string.IsNullOrWhiteSpace(story.Title))
                throw new ArgumentException("Title must not be empty.", nameof(story.Title));

            if (story.Summary == null || story.Summary.Length < 10)
                throw new ArgumentException("Summary must be at least 10 characters.", nameof(story.Summary));

            if (!Enum.IsDefined(typeof(AgeRange), story.AgeRange))
                throw new ArgumentException("Invalid AgeRange.", nameof(story.AgeRange));

            if (string.IsNullOrWhiteSpace(story.CoverImage) ||
               (!story.CoverImage.EndsWith(".png", StringComparison.OrdinalIgnoreCase) &&
                !story.CoverImage.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)))
                throw new ArgumentException("CoverImage must be a PNG or JPG file.", nameof(story.CoverImage));

            if (story.StoryBits != null)
            {
                story.StoryBits = story.StoryBits
                    .OrderBy(b => b.Order)
                    .ToList();
            }

            return _repository.Add(story);
        }

        public Story? GetById(Guid id)
        {
            return _repository.GetById(id);
        }

        public IEnumerable<Story> GetAll()
        {
            return _repository.GetAll();
        }

        public Story? Update(Guid id, Story updated)
        {
            var existing = _repository.GetById(id);
            if (existing == null)
                throw new KeyNotFoundException("Story not found.");

            if (string.IsNullOrWhiteSpace(updated.Title))
                throw new ArgumentException("Title must not be empty.", nameof(updated.Title));

            if (updated.Summary == null || updated.Summary.Length < 10)
                throw new ArgumentException("Summary must be at least 10 characters.", nameof(updated.Summary));

            if (!Enum.IsDefined(typeof(AgeRange), updated.AgeRange))
                throw new ArgumentException("Invalid AgeRange.", nameof(updated.AgeRange));

            if (updated.StoryBits != null)
            {
                updated.StoryBits = updated.StoryBits
                    .OrderBy(b => b.Order)
                    .ToList();
            }

            return _repository.Update(id, updated);
        }

        public Story? Delete(Guid id)
        {
            var existing = _repository.GetById(id);
            if (existing == null)
                throw new KeyNotFoundException("Cannot delete. Story not found.");

            return _repository.RemoveById(id);
        }
    }
}
