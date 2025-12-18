using Floura.Core.Interfaces;
using Floura.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Floura.Api.Repositories
{
    public class StoryRepository : IStoryRepository
    {
        private readonly FlouraDbContext _context;

        public StoryRepository(FlouraDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Story>> GetAllAsync()
        {
            return await _context.Stories
                .Include(s => s.StoryBits)
                .ToListAsync();
        }

        public async Task<Story?> GetByIdAsync(Guid id)
        {
            return await _context.Stories
                .Include(s => s.StoryBits)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Story> AddAsync(Story story)
        {
            if (story == null)
                throw new ArgumentNullException(nameof(story));

            if (story.Id == Guid.Empty)
                story.Id = Guid.NewGuid();

            _context.Stories.Add(story);
            await _context.SaveChangesAsync();
            return story;
        }

        public async Task<Story?> UpdateAsync(Guid id, Story story)
        {
            var existing = await _context.Stories
                .Include(s => s.StoryBits)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (existing == null)
                return null;

            existing.Title = story.Title;
            existing.Summary = story.Summary;
            existing.AgeRange = story.AgeRange;
            existing.CoverImage = story.CoverImage;
            existing.BackgroundImageKey = story.BackgroundImageKey;
            existing.StoryBits = story.StoryBits;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var existing = await _context.Stories.FindAsync(id);
            if (existing == null)
                return false;

            _context.Stories.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
