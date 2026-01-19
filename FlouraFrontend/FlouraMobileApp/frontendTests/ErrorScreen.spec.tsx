import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { Dimensions } from "react-native";
import ErrorScreen from "../src/screens/ErrorScreen";

const mockReplace = jest.fn();

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useLocalSearchParams: jest.fn(() => ({ message: "API-fejl: kunne ikke hente data" })),
}));

describe("ErrorScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Shows errorScreen with correct text", () => {
    const { getByText } = render(<ErrorScreen message="API-fejl: kunne ikke hente data" />);
    expect(getByText("Hovsa!")).toBeTruthy();
    expect(getByText("API-fejl: kunne ikke hente data")).toBeTruthy();
    expect(getByText("Prøv igen")).toBeTruthy();
  });

  it("Shows fallback-text if message is undefined", () => {
    const { getByText } = render(<ErrorScreen />);
    expect(getByText("Der skete en fejl")).toBeTruthy();
  });

  it("Calls router.replace('/') when retry-button is pressed", () => {
    const { getByText } = render(<ErrorScreen />);
    fireEvent.press(getByText("Prøv igen"));
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("Doesn't crash when rendering", () => {
    expect(() => render(<ErrorScreen />)).not.toThrow();
  });

  it("renders correctly on small screen", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 320,
      height: 568,
      scale: 2,
      fontScale: 2,
    });

    const { getByText } = render(<ErrorScreen />);
    expect(getByText("Hovsa!")).toBeTruthy();
  });
});



