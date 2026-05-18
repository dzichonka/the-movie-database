import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import RefreshButton from './RefreshButton';
import { describe, expect, test, vi, afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

describe('RefreshButton', () => {
  const mockClick = vi.fn();
  beforeEach(() => {
    render(<RefreshButton onClick={mockClick} />);
  });
  afterEach(() => {
    cleanup();
  });

  test('should renders refresh button', () => {
    const button = screen.getByRole('button', { name: /Fix it!/i });
    expect(button).toBeInTheDocument();
  });

  test('should call onClick when refresh button is clicked', () => {
    const button = screen.getByRole('button', { name: /Fix it!/i });
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  });
});
