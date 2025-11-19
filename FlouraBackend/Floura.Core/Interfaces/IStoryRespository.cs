using System;

public class IStoryRepository
{
    public interface IStoryRepository
    {
        Story? Add(Story story);

        Story? GetById(Guid id);

        Story? Update(Guid id, Story story);

        Story? RemoveById(Guid id);

        IEnumerable<Story> GetAll();
    }

}
