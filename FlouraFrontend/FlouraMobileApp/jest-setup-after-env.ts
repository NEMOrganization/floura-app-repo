import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import * as React from 'react';

const INSETS = { top: 0, bottom: 0, left: 0, right: 0 };
const SafeAreaInsetsContext = React.createContext(INSETS);

jest.mock('react-native-safe-area-context', () => ({
  __esModule: true,

  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaConsumer: ({ children }: any) => children(INSETS),
  SafeAreaInsetsContext,

  useSafeAreaInsets: () => INSETS,
}));

jest.mock(
  'react-native-safe-area-context/Libraries/NativeSafeAreaProvider',
  () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => children,
  }),
);
