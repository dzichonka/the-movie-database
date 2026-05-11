import { cleanup, render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import type { JSX } from 'react';

function ErrorComponent(): JSX.Element {
  throw new Error('Test error from component!');
}

describe('ErrorBoundary', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  beforeEach(() => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
  });
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('should catches and handles errors and displays fallback UI when error occurs', () => {
    expect(
      screen.getByText('Error boundary caught an error')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fix it!' })).toBeInTheDocument();
  });

  test('should not display main content when error occurs', () => {
    expect(
      screen.queryByRole('button', { name: 'Error' })
    ).not.toBeInTheDocument();
  });

  test('should log error to console', () => {
    expect(consoleSpy).toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );
  });
});
