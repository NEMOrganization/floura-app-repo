import { render } from "@testing-library/react-native";
import StoryImage from "../src/components/StoryImage";

describe("StoryImage", () => {
  // Hvis vi får billedet gennem en url
 /*   it("renders the image with the correct URL", () => {
    const { getByTestId } = render(
      <StoryImage source="https://example.com/story.jpg" />
    );

    const image = getByTestId("story-image");

    expect(image.props.source).toEqual({ uri: "https://example.com/story.jpg" });
  });  */


  // Hvis vi gemmer billedet lokalt og henter derfra
  it("renders the local image when given a require source", () => {
    const localImg = require("../assets/images/android-icon-background.png");

    const { getByTestId } = render(<StoryImage source={localImg} />);

    expect(getByTestId("story-image").props.source).toBe(localImg);
  });  
});
