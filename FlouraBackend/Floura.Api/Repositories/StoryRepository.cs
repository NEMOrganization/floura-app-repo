using System;
using System.Collections.Generic;
using System.Linq;
using Floura.Core.Interfaces;
using Floura.Core.Models;

namespace Floura.Api.Repositories
{
    public class StoryRepository : IStoryRepository
    {
        private readonly List<Story> _stories = new();

        public StoryRepository()
        {
            // testdata 
            _stories.Add(new Story("En morgentur i dalen", "Morgentandbørstning historie", AgeRange.Age2To5, "billede1.png"));
            _stories.Add(new Story("En tur ind i mørket", "Aften tandbørstning", AgeRange.Age6To8, "billede2.png"));
        }

        public Story? Add(Story story)
        {
            if (story == null)
                return null;

            if (story.Id == Guid.Empty)
                story.Id = Guid.NewGuid();

            _stories.Add(story);
            return story;
        }

        public IEnumerable<Story> GetAll()
        {
            return _stories;
        }

        public Story? GetById(Guid id)
        {
            return _stories.FirstOrDefault(s => s.Id == id);
        }

        public Story? Update(Guid id, Story updatedStory)
        {
            var existing = GetById(id);
            if (existing == null)
                return null;

            existing.Title = updatedStory.Title;
            existing.Summary = updatedStory.Summary;
            existing.CoverImage = updatedStory.CoverImage;
            existing.AgeRange = updatedStory.AgeRange;
            existing.StoryBits = updatedStory.StoryBits;

            return existing;
        }

        public Story? RemoveById(Guid id)
        {
            var story = GetById(id);
            if (story == null)
                return null;

            _stories.Remove(story);
            return story;
        }
    }
}
