import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ErrorPage } from './ErrorPage';
import { describe, expect, test, vi, afterAll } from 'vitest';
import '@testing-library/jest-dom';

describe('ErrorPage', () => {
  afterAll(() => {
    cleanup();
  });

  test('should renders ErrorPage', () => {
    const mochRefresh = vi.fn();
    render(<ErrorPage onRefresh={mochRefresh} />);
    expect(
      screen.getByRole('button', { name: /Fix it!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Error boundary caught an error/i)
    ).toBeInTheDocument();
  });

  test('should call onClick when refresh button is clicked', () => {
    const mochRefresh = vi.fn();
    render(<ErrorPage onRefresh={mochRefresh} />);
    const button = screen.getByRole('button', { name: /Fix it!/i });
    fireEvent.click(button);
    expect(mochRefresh).toHaveBeenCalled();
  });
});
