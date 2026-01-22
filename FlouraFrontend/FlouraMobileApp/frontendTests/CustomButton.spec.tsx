import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../src/components/CustomButton';


describe("CustomButton", () => {
    
    it("Shows title", () => {
        // arrange
        const { getByText } = render(<CustomButton title="Click me" />);
        // assert
        expect(getByText("Click me")).toBeTruthy();
    });

    it("Calls onPress when button is pressed", () => {
        // arrange
        const onPress = jest.fn();
        const { getByText } = render(<CustomButton title="Click" onPress={onPress} />);

        // act
        fireEvent.press(getByText("Click"));

        //assert
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("Dosen't call onPress when button is disabled", () => {
        // arrange
        const onPress = jest.fn();
        const { getByText } = render(
        <CustomButton title="Disabled" onPress={onPress} disabled />);

        // act
        fireEvent.press(getByText("Disabled"));

        // assert
        expect(onPress).not.toHaveBeenCalled();
    });

    it("Shows loading when loading=true", () => {
        // arrange
        const { getByTestId } = render(<CustomButton title="Load" loading />);

        // assert
        expect(getByTestId("button-loader")).toBeTruthy();
    });

    it("Hides title when loading=true", () => {
        // arrange
        const { queryByText } = render(<CustomButton title="Load" loading />);

        // assert
        expect(queryByText("Load")).toBeNull();
    });

    it("Uses correct style variant (primary)", () => {
        // arrange
        const { getByTestId } = render(<CustomButton title="Test" variant="primary" />);
        const wrapper = getByTestId("button-wrapper");

        // assert
        expect(wrapper.props.style.backgroundColor).toBe("#FCF5EE");
    });

    it("Has accessibilityRole='button'", () => {
        // arrange
        const { getByRole } = render(<CustomButton title="Acc" />);

        // assert
        expect(getByRole("button")).toBeTruthy();
    });
});

