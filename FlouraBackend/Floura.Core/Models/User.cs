using Floura.Core.Models.Enums;
using System;
using System.Collections.Generic;

namespace Floura.Core.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public List<Child> Children { get; set; } = new();
        public Language Language { get; set; }


        public User(string email, string passwordHash, Language language)
        {
            Email = email;
            PasswordHash = passwordHash;
            Language = language;
        }

        public User()
        {

        }

    }
}
