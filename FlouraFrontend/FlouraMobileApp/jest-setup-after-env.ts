import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

import * as SafeAreaJestMock from 'react-native-safe-area-context/jest/mock';

// Nogle setups eksporterer mocken som default, andre som namespace.
// Den her linje gør det robust i CI.
const safeAreaMock: any = (SafeAreaJestMock as any).default ?? SafeAreaJestMock;

jest.mock('react-native-safe-area-context', () => safeAreaMock);
jest.mock(
  'react-native-safe-area-context/Libraries/NativeSafeAreaProvider',
  () => safeAreaMock,
);
