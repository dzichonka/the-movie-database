import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import { describe, expect, test, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';

describe('RefreshButton', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('should renders error button', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /Error/i });
    expect(button).toBeInTheDocument();
  });

  test('should call onClick when Error button is clicked', () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /Error/i });
    expect(() => {
      fireEvent.click(button);
    }).toThrow('Test error from button!');
  });
});
