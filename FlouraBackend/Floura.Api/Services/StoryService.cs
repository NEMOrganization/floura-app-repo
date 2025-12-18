 using Floura.Core.Interfaces;
using Floura.Core.Models;

namespace Floura.Core.Services
{
    public class UserService : IStoryService
    {
        private readonly IStoryRepository _repository;

        public UserService(IStoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<Story> CreateAsync(Story story)
        {
            if (story == null)
                throw new ArgumentNullException(nameof(story));

            return await _repository.AddAsync(story);
        }

        public Task<Story?> GetByIdAsync(Guid id)
        {
            return _repository.GetByIdAsync(id);
        }

        public Task<IEnumerable<Story>> GetAllAsync()
        {
            return _repository.GetAllAsync();
        }

        public async Task<Story?> UpdateAsync(Guid id, Story story)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
                return null;

            return await _repository.UpdateAsync(id, story);
        } 

        public async Task<bool> DeleteAsync(Guid id)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
                return false;

            return await _repository.DeleteAsync(id);
        }
    }
}
