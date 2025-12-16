import React from "react";
import { render } from "@testing-library/react-native";
import StoryDetailScreen from "../src/screens/StoryDetailScreen";
import { storyService } from "../src/services/storyService";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({
    storyId: "1",
  }),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

jest.mock("../src/services/storyService", () => ({
  storyService: {
    getStoryById: jest.fn(),
  },
}));

const mockStory = {
  id: "1",
  title: "Floura på eventyr",
  summary: "Morgentandbørstning",
  coverImageUrl: "https://example.com/image.png",
};

describe("StoryDetailScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (storyService.getStoryById as jest.Mock).mockResolvedValue(mockStory);
  });

  it("shows title, summary and cover image", async () => {
  const { findByText, findByTestId } = render(<StoryDetailScreen />);

  expect(await findByText(mockStory.title)).toBeTruthy();
  expect(await findByText(mockStory.summary)).toBeTruthy();

  const img = await findByTestId("story-image");
  expect(img.props.source).toEqual({
    uri: mockStory.coverImageUrl,
  });
});

});


