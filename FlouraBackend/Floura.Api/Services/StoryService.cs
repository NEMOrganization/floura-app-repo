using Floura.Core.Interfaces;
using Floura.Core.Models;
using Floura.Core.Models.Floura.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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
                throw new Exception("Story cannot be null.");

            if (string.IsNullOrWhiteSpace(story.Title))
                throw new Exception("Title must not be empty.");

            if (story.Summary == null || story.Summary.Length < 10)
                throw new Exception("Summary must be at least 10 characters.");

            if (!Enum.IsDefined(typeof(AgeRange), story.AgeRange))
                throw new Exception("Invalid AgeRange.");

            if (string.IsNullOrWhiteSpace(story.CoverImage) ||
               (!story.CoverImage.EndsWith(".png") &&
                !story.CoverImage.EndsWith(".jpg")))
                throw new Exception("CoverImage must be a PNG or JPG file.");

            story.StoryBits = story.StoryBits.OrderBy(b => b.Order).ToList();

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
                throw new Exception("Story not found.");

            if (string.IsNullOrWhiteSpace(updated.Title))
                throw new Exception("Title must not be empty.");

            if (updated.Summary == null || updated.Summary.Length < 10)
                throw new Exception("Summary must be at least 10 characters.");

            if (!Enum.IsDefined(typeof(AgeRange), updated.AgeRange))
                throw new Exception("Invalid AgeRange.");

            updated.StoryBits = updated.StoryBits.OrderBy(b => b.Order).ToList();

            return _repository.Update(id, updated);
        }

        public Story? Delete(Guid id)
        {
            var existing = _repository.GetById(id);
            if (existing == null)
                throw new Exception("Cannot delete. Story not found.");

            return _repository.RemoveById(id);
        }
    }
}
