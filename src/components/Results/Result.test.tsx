import { render, screen, cleanup } from '@testing-library/react';
import Result from './Result';
import { describe, expect, test, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import type { Movie } from '../../types/api-types';

type MockData = Partial<Movie>;

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
const setup = (customData?: MockData) => {
  const mockData = customData
    ? ([...DEFAULT_MOVIES, customData] as Movie[])
    : ([...DEFAULT_MOVIES] as Movie[]);

  render(<Result data={mockData as Movie[]} />);
  const cards = mockData.map((movie) => screen.getByText(movie.title!));
  return { mockData, cards };
};

describe('Result', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render correct number of cards when data is provided', () => {
    const { cards, mockData } = setup();
    expect(cards).toHaveLength(3);
    expect(cards.length).toBe(mockData.length);
  });

  test('should correctly displays items titles and descriptions', () => {
    const { mockData } = setup();
    mockData.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(movie.overview)).toBeInTheDocument();
    });
  });
});
