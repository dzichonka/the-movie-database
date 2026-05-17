import { render, screen, cleanup } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

import { describe, expect, test, afterEach } from 'vitest';
import '@testing-library/jest-dom';

describe('NotFoundPage Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should renders NotFoundPage', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
