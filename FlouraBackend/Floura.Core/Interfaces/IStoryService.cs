using Floura.Core.Models;

namespace Floura.Core.Interfaces
{
    public interface IStoryService
    {
        Task<Story?> CreateAsync(Story story);
        Task<Story?> GetByIdAsync(Guid id);
        Task<IEnumerable<Story>> GetAllAsync();
        Task<Story?> UpdateAsync(Guid id, Story story);
        Task<bool> DeleteAsync(Guid id);
    }
}
