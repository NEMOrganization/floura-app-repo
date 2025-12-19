using Floura.Core.Interfaces;
using Floura.Core.Models;

namespace Floura.Api.Services
{
    public class UserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<User> CreateAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            return await _repository.AddAsync(user);
        }

        public Task<User?> GetByIdAsync(Guid id)
        {
            return _repository.GetByIdAsync(id);
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            return _repository.GetAllAsync();
        }

        public async Task<User?> UpdateAsync(Guid id, User user)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
                return null;

            return await _repository.UpdateAsync(id, user);
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

