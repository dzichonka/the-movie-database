import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';
import { describe, expect, test, afterEach } from 'vitest';

describe('Loader', () => {
  afterEach(() => {
    cleanup();
  });

  test('should renders loading spinner,', () => {
    render(<Loader />);
    const spinner = screen.getByRole('loader');
    expect(spinner).toBeInTheDocument();
  });
});
