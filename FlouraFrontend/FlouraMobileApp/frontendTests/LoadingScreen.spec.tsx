import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingScreen from '../src/screens/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading-screen', () => {
    //arrange
    const { getByTestId } = render(<LoadingScreen />);

    //act

    //assert
    expect(getByTestId('loading-screen')).toBeTruthy();
  });

  it('shows loading text', () => {
    //arrange
    const { getByText } = render(<LoadingScreen />);

    //act

    //assert
    expect(getByText('Floura tænker…')).toBeTruthy();
  });

  it('shows toothbrush emoji', () => {
    // arrange
    const { getByText } = render(<LoadingScreen />);

    // act

    // assert
    expect(getByText('🪥')).toBeTruthy();
  });

  it('renders toothpaste element', () => {
    // arrange
    const { getByTestId } = render(<LoadingScreen />);

    // act

    // assert
    expect(getByTestId('loading-toothbrush')).toBeTruthy();
  });
});
