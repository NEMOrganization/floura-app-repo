using System;
using System.Collections.Generic;

namespace Floura.Core.Models
{
    public class Child
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public int Age { get; set; }

        public Guid UserId { get; set; }
        public required User User { get; set; } 

        public Child()
        {

        }

    }
}
