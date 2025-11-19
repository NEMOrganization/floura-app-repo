using Floura.Core.Models;

namespace Floura.Core.Interfaces
{
    public interface IStoryService
    {
        Story? Create(Story story);
        Story? GetById(Guid id);
        IEnumerable<Story> GetAll();
        Story? Update(Guid id, Story story);
        Story? Delete(Guid id);
    }
}
