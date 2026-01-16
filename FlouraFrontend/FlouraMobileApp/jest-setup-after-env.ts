import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

import safeAreaMock from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => safeAreaMock);
jest.mock(
  'react-native-safe-area-context/Libraries/NativeSafeAreaProvider',
  () => safeAreaMock,
);
