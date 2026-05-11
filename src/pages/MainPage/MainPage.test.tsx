import { render, screen, cleanup, waitFor } from '@testing-library/react';
import MainPage from './MainPage';

import { describe, expect, test, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import type { Response, Movie } from '../../types/api-types';
import { apiService } from '../../services/api-service';

type MockData = Partial<Movie>;
type MockResponse = Partial<Response>;

const DEFAULT_MOVIES: MockData[] = [
  {
    title: 'Project Hail Mary',
    release_date: '2026-03-20',
    poster_path: null,
    overview: 'Science teacher Ryland Grace...',
  },
  {
    title: 'Harry Potter',
    release_date: '2001-11-16',
    poster_path: null,
    overview: 'Back to Hogwarts',
  },
  {
    title: 'Green Mile',
    release_date: '1999-12-10',
    poster_path: null,
    overview: 'The Green Mile',
  },
];

const DEFAULT_RESPONSE: MockResponse = {
  results: DEFAULT_MOVIES as Movie[],
};
const setup = (customData?: MockResponse) => {
  const mockData = customData
    ? ({ ...customData } as Response)
    : ({ ...DEFAULT_RESPONSE } as Response);

  render(<MainPage />);
  return { mockData };
};

vi.mock('../../services/api-service', () => ({
  apiService: {
    getAllMovies: vi.fn(),
  },
}));

const mockedService = vi.mocked(apiService);
describe('MainPage Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('should renders MainPage', () => {
    setup();
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Error' })).toBeInTheDocument();
  });

  test('should show loader while loading', async () => {
    mockedService.getAllMovies.mockResolvedValueOnce(
      DEFAULT_RESPONSE as Response
    );
    const { mockData } = setup();

    expect(screen.getByRole('loader')).toBeInTheDocument();

    await screen.findByText(mockData.results[0].title);

    expect(screen.queryByRole('loader')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Failed to fetch movies, please try again')
    ).not.toBeInTheDocument();
  });

  test('should render empty div if no data', async () => {
    mockedService.getAllMovies.mockResolvedValueOnce({
      results: [] as Movie[],
    } as Response);
    setup();
    const nothingFound = await screen.findByRole('heading', {
      name: 'nothing founds',
    });
    expect(nothingFound).toBeInTheDocument();
  });

  test('should throw error message on API error', async () => {
    mockedService.getAllMovies.mockRejectedValueOnce(new Error('OOPS'));
    setup();
    const errorMessage = await screen.findByRole('heading', {
      name: 'Failed to fetch movies, please try again',
    });

    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByRole('loader')).not.toBeInTheDocument();
  });

  test('should make initial API call on mount', async () => {
    mockedService.getAllMovies.mockResolvedValueOnce(
      DEFAULT_RESPONSE as Response
    );
    setup();
    await waitFor(() => {
      expect(mockedService.getAllMovies).toHaveBeenCalledTimes(1);
      expect(mockedService.getAllMovies).toHaveBeenCalledWith(1, '');
    });
  });
});
