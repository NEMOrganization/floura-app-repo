using System;

public class Story
{
    
    public Guid Id { get; set; } = Guid.NewGuid(); //instaliser automatisk id
    public string Title { get; set; }
    public string Summary { get; set; }
    public string CoverImage { get; set; }

    public List<StoryBits> StoryBits { get; set; }
    public AgeRange AgeRange { get; set; }



    public Story(string title, string summary, AgeRange ageRange, string coverImage)
    {
        Title = title;
        Summary = summary;
        AgeRange = ageRange;
        CoverImage = coverImage;
    }

    public Story()
	{
	}


}
