using Floura.Core.Models;

namespace Floura.Core.Interfaces
{
    public interface IStoryRepository
    {
        Task<IEnumerable<Story>> GetAllAsync();

        Task<Story?> GetByIdAsync(Guid id);

        Task<Story> AddAsync(Story story);

        Task<Story?> UpdateAsync(Guid id, Story story);

        Task<bool> DeleteAsync(Guid id);
    }
}
