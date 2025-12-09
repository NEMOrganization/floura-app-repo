// __tests__/Button.spec.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/Button';


describe("Button", () => {
    
    it("Shows title", () => {
        // arrange
        const { getByText } = render(<Button title="Click me" />);

        // act 
        // we dont have a user action = no act

        // assert
        expect(getByText("Click me")).toBeTruthy();
    });

    it("Calls onPress when button is pressed", () => {
        // arrange
        const onPress = jest.fn();
        const { getByText } = render(<Button title="Click" onPress={onPress} />);

        // act
        fireEvent.press(getByText("Click"));

        //assert
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("Dosen't call onPress when button is disabled", () => {
        // arrange
        const onPress = jest.fn();
        const { getByText } = render(
        <Button title="Disabled" onPress={onPress} disabled />);

        // act
        fireEvent.press(getByText("Disabled"));

        // assert
        expect(onPress).not.toHaveBeenCalled();
    });

    it("Shows loading when loading=true", () => {
        // arrange
        const { getByTestId } = render(<Button title="Load" loading />);

        // act

        // assert
        expect(getByTestId("button-loader")).toBeTruthy();
    });

    it("Hides title when loading=true", () => {
        // arrange
        const { queryByText } = render(<Button title="Load" loading />);

        // act

        // assert
        expect(queryByText("Load")).toBeNull();
    });

    it("Uses correct style variant (primary)", () => {
        // arrange
        const { getByTestId } = render(<Button title="Test" variant="primary" />);
        const wrapper = getByTestId("button-wrapper");

        // act

        // assert
        expect(wrapper.props.style.backgroundColor).toBe("#007AFF");
    });

    it("Has accessibilityRole='button'", () => {
        // arrange
        const { getByRole } = render(<Button title="Acc" />);

        // act

        // assert
        expect(getByRole("button")).toBeTruthy();
    });
});


// descript('') = samler test der er releteret til samme komponent, i dette tilfælde Button komponentet. 
// it('') = er det der definere test-casen, så for hvert "it('')" betyder det, at der er en ny test. 
//          Det er også her man sætter titlen på testen som en string. 
//expect() = det man forventer af testen.

