using System;

public class Child
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }

    private int _age;
    public int Age
    {
        get => _age;
        set
        {
            if (value < 2 || value > 5)
                throw new ArgumentException("Child age must be between 2 and 5 years.");
            _age = value;
        }
    }

    // Relation til User - skal være her fordi child tilhører en user
    public Guid UserId { get; set; }
    public User User { get; set; }

    public Child(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public Child()
    {
    }
}
