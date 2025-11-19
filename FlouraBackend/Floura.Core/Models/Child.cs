using System;
using System.Collections.Generic;

namespace Floura.Core.Models
{
    public class Child
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public int Age { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; } //der skal være en bruger tilknyttet barnet, ved ikke om det er korrekt


        public Child(string name, int age)
        {
            Name = name;
            Age = age;
        }

        public Child()
        {

        }

    }
}
