using System;

public class Story
{
    public string? Title { get; set; }
    public string? Summary { get; set; }

    public bool IsValid()
    {
        return !string.IsNullOrWhiteSpace(Title)
            && !string.IsNullOrWhiteSpace(Summary);
    }
}

