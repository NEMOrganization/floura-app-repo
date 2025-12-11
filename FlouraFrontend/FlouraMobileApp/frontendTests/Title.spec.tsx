import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Title from '../src/components/Title';


describe("Title", () => {
    
    it("Renders the title", () => {
        // arrange
        const { getByText } = render(<Title text="Flouras adventure" />);

        // assert
        expect(getByText("Flouras adventure")).toBeTruthy();
    });
});