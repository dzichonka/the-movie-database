import { render, screen, cleanup } from '@testing-library/react';
import Card from './Card';
import { describe, expect, test, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import type { Movie } from '../../types/api-types';

type MockData = Partial<Movie>;

const DEFAULT_MOVIE: MockData = {
  title: 'Project Hail Mary',
  release_date: '2026-03-20',
  poster_path: null,
  overview: 'Science teacher Ryland Grace...',
};

const setup = (customData: MockData = {}) => {
  const mockData = {
    ...DEFAULT_MOVIE,
    ...customData,
  } as Movie;

  render(<Card data={mockData as Movie} />);

  return { ...mockData };
};

describe('Card', () => {
  afterEach(() => {
    cleanup();
  });

  test('should displays item title and overview correctly', () => {
    const { title, overview } = setup();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(overview)).toBeInTheDocument();
  });

  test('should displays release date correctly', () => {
    setup();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  test('should displays image correctly', () => {
    const { poster_path } = setup({
      poster_path: '/yihdXomYb5kTeSivtFndMy5iDmf.jpg',
    });
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${poster_path}`
    );
  });

  test('should displays image if poster_path is ancorect', () => {
    setup();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/no-image-icon.png'
    );
  });
});
