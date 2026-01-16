
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import StoryBitScreen from '../src/screens/StoryBitScreen';
import { Story } from '@/src/models/Story';

jest.mock('@expo/vector-icons', () => {
  const Mock = () => null;
  return { Feather: Mock };
});

jest.mock('../src/context/StoriesContext', () => ({
  useStories: (): { getStoryById: (id?: string) => Story } => ({
    getStoryById: () => ({
      id: '1',
      title: 'Test Story',
      summary: 'This is a test story.',
      coverImageUrl: 'https://example.com/cover.jpg',
      storyBits: [
        { id: 'bit1', content: 'Content of Story Bit 1', order: 1 },
        { id: 'bit2', content: 'Content of Story Bit 2', order: 2 },
        { id: 'bit3', content: 'Content of Story Bit 3', order: 3 },
      ],
      ageRange: '5-7',
    }),
  }),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ storyId: '1' })),
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}));

describe('StoryBitScreen', () => {
  let screen: ReturnType<typeof render>;

  beforeEach(() => {
    screen = render(<StoryBitScreen />);
  });

  it('renders first bit and slide count', () => {
    expect(screen.getByText('Content of Story Bit 1')).toBeTruthy();
    expect(screen.getByText('1 / 3')).toBeTruthy();
  });

  it('navigates to next bit using arrow', () => {
    const nextArrow = screen.getByTestId('next-arrow');
    act(() => {
      fireEvent.press(nextArrow);
    });

    expect(screen.getByText('Content of Story Bit 2')).toBeTruthy();
    expect(screen.getByText('2 / 3')).toBeTruthy();
  });

  it('navigates to previous bit', () => {
    const nextArrow = screen.getByTestId('next-arrow');

    act(() => {
      fireEvent.press(nextArrow);
    });
    expect(screen.getByText('Content of Story Bit 2')).toBeTruthy();

    const prevArrow = screen.getByTestId('previous-arrow');
    act(() => {
      fireEvent.press(prevArrow);
    });
    expect(screen.getByText('Content of Story Bit 1')).toBeTruthy();
  });

  it('does not navigate past first or last bit', () => {
    expect(screen.queryByTestId('previous-arrow')).toBeNull();

    const nextArrow = screen.getByTestId('next-arrow');
    act(() => {
      fireEvent.press(nextArrow);
    });
    act(() => {
      fireEvent.press(nextArrow);
    });

    expect(screen.queryByTestId('next-arrow')).toBeNull();
    expect(screen.getByText('Content of Story Bit 3')).toBeTruthy();
  });

  it('uses default background when no backgroundImageKey is provided', () => {
    expect(screen.getByTestId('story-background')).toBeTruthy();
  });
});
