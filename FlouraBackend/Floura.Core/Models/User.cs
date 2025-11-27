using Floura.Core.Models.Enums;
using System;
using System.Collections.Generic;

namespace Floura.Core.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public List<Child> Children { get; set; } = new();
        public Language Language { get; set; }



        public User()
        {

        }

    }
}
