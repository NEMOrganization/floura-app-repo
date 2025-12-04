// __tests__/Button.spec.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/Button';


describe('Button', () => {
  it('viser title og kalder onPress ved klik', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click me" onPress={onPress} />);
    const btn = getByText('Click me');
    expect(btn).toBeTruthy(); // tekst vises
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
  it('kalder ikke onPress når disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Nope" onPress={onPress} disabled />);
    fireEvent.press(getByText('Nope'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

// descript('') = samler test der er releteret til samme komponent, i dette tilfælde Button komponentet. 
// it('') = er det der definere test-casen, så for hvert "it('')" betyder det, at der er en ny test. 
//          Det er også her man sætter titlen på testen som en string. 
//

