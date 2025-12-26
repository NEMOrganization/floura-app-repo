using Floura.Core.Interfaces;
using Floura.Core.Models;

namespace Floura.Api.Services
{
    public class UserService : IUserService
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

            // Hash password før gem
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

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

            existing.Email = user.Email;
            existing.Language = user.Language;
            existing.Children = user.Children;

            // Hash kun hvis password er sendt med
            if (!string.IsNullOrWhiteSpace(user.PasswordHash))
            {
                existing.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            }

            return await _repository.UpdateAsync(id, existing);
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

