import { render, fireEvent } from "@testing-library/react-native";
import StoryDetailScreen from "../src/screens/StoryDetailScreen";
import stories from "../src/mock/stories.json";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useRoute: () => ({
    params: { storyId: "1" }
  }),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
  })
}));

describe("StoryDetailScreen", () => {
  const mockStory = stories[0];

  it("shows title, summary and cover image", () => {
    const { getByText, getByTestId } = render(<StoryDetailScreen story={mockStory} />);

    //Title
    expect(getByText(mockStory.title)).toBeTruthy();

    //Summary/Paragraph
    expect(getByText(mockStory.summary)).toBeTruthy();

    //CoverImage
    const img = getByTestId("story-cover-image");
    expect(img.props.source).toEqual({ uri: mockStory.coverImageUrl });
  });

  //Button
  it("shows a button to start the story", () => {
    const { getByText } = render(<StoryDetailScreen story={mockStory} />);

    expect(getByText("Læs historien")).toBeTruthy();
  });

  it("navigates to StoryBitsScreen when button is pressed", () => {
    const { getByText } = render(<StoryDetailScreen story={mockStory} />);
    
    fireEvent.press(getByText("Læs historien"));

    expect(mockNavigate).toHaveBeenCalledWith("StoryBitsScreen", {
      storyId: mockStory.id
    });
  });
});

