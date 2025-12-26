import { Image } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';

import StoriesOverviewScreen from '../src/screens/StoriesOverviewScreen';
import { storyService } from '../src/services/storyService';
import StoriesList from '../src/components/StoriesList';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../src/services/storyService', () => ({
  storyService: {
    getStories: jest.fn(),
  },
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Vi tester ikke Loading/Title her -> de skal bare ikke larme
jest.mock('../src/components/Loading', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('../src/components/Title', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('../src/components/StoriesList', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('../assets/images/coverImages/coverKids.jpg', () => 1);

beforeAll(() => {
  // stabiliser den del af screenen der sætter coverImageUrl
  jest
    .spyOn(Image, 'resolveAssetSource')
    .mockReturnValue({ uri: 'mock-uri' } as any);
});

describe('StoriesOverviewScreen (data)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches stories and passes them to StoriesList', async () => {
    const stories = [
      {
        id: '1',
        title: 'Test historie',
        coverImageUrl: '',
        summary: 'Summary',
        storyBits: [],
      },
    ];
    (storyService.getStories as jest.Mock).mockResolvedValueOnce(stories);

    render(<StoriesOverviewScreen />);

    // 1) den henter data
    await waitFor(() =>
      expect(storyService.getStories).toHaveBeenCalledTimes(1),
    );

    // 2) den sender data videre til StoriesList
    await waitFor(() => expect(StoriesList).toHaveBeenCalledTimes(1));

    const props = (StoriesList as unknown as jest.Mock).mock.calls[0][0];

    expect(props.items).toHaveLength(1);
    expect(props.items[0]).toMatchObject({
      id: '1',
      title: 'Test historie',
      summary: 'Summary',
    });
  });
});
