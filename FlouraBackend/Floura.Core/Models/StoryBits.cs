using System;

public class StoryBit
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Text { get; set; }
    public string Image { get; set; }
    public int Order { get; set; }

    public Guid StoryId { get; set; }
    public Story Story { get; set; }

    public StoryBit(string text, string image, int order)
    {
        Text = text;
        Image = image;
        Order = order;
    }

    public StoryBit() 
    { 
    }
}



