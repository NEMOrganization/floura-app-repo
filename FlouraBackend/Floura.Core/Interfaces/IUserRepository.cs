using Floura.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Floura.Core.Interfaces
{
    public interface IUserRepository
    {

        Task<IEnumerable<User>> GetAllAsync();

        Task<User?> GetByIdAsync(Guid id);

        Task<User> AddAsync(User user);

        Task<User?> UpdateAsync(Guid id, User user);

        Task<bool> DeleteAsync(Guid id);
    }
}

