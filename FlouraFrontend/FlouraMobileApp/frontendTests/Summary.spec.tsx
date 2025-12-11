import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Summary from '../src/components/Summary';


describe("Summary", () => {
    
    it("Renders the summery", () => {
        // arrange
        const { getByText } = render(<Summary text="Flouras adventure summary" />);

        // act 
        // we dont have a user action = no act

        // assert
        expect(getByText("Flouras adventure summary")).toBeTruthy();
    });
});