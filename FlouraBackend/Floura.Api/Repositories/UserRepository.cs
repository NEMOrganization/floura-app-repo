using Floura.Core.Interfaces;
using Floura.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Floura.Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly FlouraDbContext _context;

        public UserRepository(FlouraDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                .Include(c => c.Children)
                .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users
                .Include(c => c.Children)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<User> AddAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            if (user.Id == Guid.Empty)
                user.Id = Guid.NewGuid();

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> UpdateAsync(Guid id, User user)
        {
            var existing = await _context.Users
                .Include(c => c.Children)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (existing == null)
                return null;

            existing.Email = user.Email;
            existing.PasswordHash = user.PasswordHash;
            existing.Children = user.Children;
            existing.Language = user.Language;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var existing = await _context.Users.FindAsync(id);
            if (existing == null)
                return false;

            _context.Users.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
