import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { storyService } from '../src/services/storyService';

// Mock safe-area så den ikke sluger children i tests
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaProvider: ({ children }: any) => <View>{children}</View>,
    SafeAreaView: ({ children }: any) => <View>{children}</View>,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// Mock service
jest.mock('../src/services/storyService', () => ({
  storyService: {
    getStories: jest.fn(),
  },
}));

// Mock navigation
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

// Mock statusbar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Gør Title testbar (ren tekst)
jest.mock('../src/components/Title', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return function MockTitle({ text }: { text: string }) {
    return <Text>{text}</Text>;
  };
});

// Gør StoriesList simpel
jest.mock('../src/components/StoriesList', () => {
  const React = require('react');
  const { View } = require('react-native');
  return function MockStoriesList() {
    return <View />;
  };
});

// Import AFTER mocks
import StoriesOverviewScreen from '../src/screens/StoriesOverviewScreen';

describe('StoriesOverviewScreen', () => {
  it('renders overview title after loading', async () => {
    (storyService.getStories as jest.Mock).mockResolvedValueOnce([]);

    const { getByText } = render(<StoriesOverviewScreen />);

    await waitFor(() => {
      expect(getByText('Historie oversigt')).toBeTruthy();
    });
  });
});
