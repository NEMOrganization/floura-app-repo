using Floura.Api.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Floura.Tests
{
    public class StoryRepositoryTests
    {
        private readonly FlouraDbContext _context;
        private readonly StoryRepository _repository;

        public StoryRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<FlouraDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new FlouraDbContext(options);
            _repository = new StoryRepository(_context);
        }
    }
}
