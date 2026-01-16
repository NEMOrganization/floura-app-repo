jest.mock('react-native-safe-area-context', () => {
  const React = require('react');

  const mockInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  return {
    SafeAreaProvider: ({ children }: any) => children,
    SafeAreaConsumer: ({ children }: any) => children(mockInsets),
    SafeAreaInsetsContext: React.createContext(mockInsets),
    useSafeAreaInsets: () => mockInsets,
  };
});
