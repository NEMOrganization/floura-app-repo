import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { Dimensions } from "react-native";
import ErrorScreen from "../app/errorScreen";
import { useLocalSearchParams } from "expo-router";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  useLocalSearchParams: jest.fn(() => ({
    message: "API-fejl: kunne ikke hente data",
  })),
}));

describe("ErrorScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Shows errorScreen with correct text", () => {
    const { getByText } = render(<ErrorScreen />);

    expect(getByText("Hovsa!")).toBeTruthy();
    expect(getByText("API-fejl: kunne ikke hente data")).toBeTruthy();
    expect(getByText("Prøv igen")).toBeTruthy();
  });

  it("Shows fallback-text if message is null", () => {
  (useLocalSearchParams as jest.Mock).mockReturnValueOnce({});

  const { getByText } = render(<ErrorScreen />);

  expect(getByText("Historien gemmer sig vist")).toBeTruthy();
});


  it("Calls router.replace('/') when retry-button is pressed", () => {
    const { getByText } = render(<ErrorScreen />);

    fireEvent.press(getByText("Prøv igen"));

    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("Dosen't crash when rendering", () => {
    expect(() => render(<ErrorScreen />)).not.toThrow();
  });

  it("renders correct on small screen", () => {
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


