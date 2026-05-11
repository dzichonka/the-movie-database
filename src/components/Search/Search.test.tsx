import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Search from './Search';
import { describe, expect, test, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom';

const setup = (onSearch = vi.fn()) => {
  render(<Search onSearch={onSearch} />);
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');
  return { input, button, onSearch };
};

describe('Search', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  test('should render search input and search button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should display previously saved search term from localStorage on mount', () => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    const { input } = setup();
    expect(input).toHaveValue(lastSearch);
  });

  test('should initialize with last search from localStorage', () => {
    localStorage.setItem('lastSearch', 'Anna');
    const { input } = setup();
    expect(input).toHaveValue('Anna');
  });

  test('should show empty input when no saved term exists', () => {
    localStorage.clear();
    const { input } = setup();
    expect(input).toHaveValue('');
  });

  test('should update input value when user types', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'typing' } });
    expect(input).toHaveValue('typing');
  });

  test('should save search term to localStorage when search button is clicked', () => {
    const { input, button } = setup();
    fireEvent.change(input, { target: { value: 'new search' } });
    fireEvent.click(button);
    expect(localStorage.getItem('lastSearch')).toBe('new search');
  });

  test('should overwrite existing localStorage value when new search is performed', () => {
    const { input, button, onSearch } = setup();
    fireEvent.change(input, { target: { value: 'save to LS' } });
    fireEvent.click(button);
    expect(localStorage.getItem('lastSearch')).toBe('save to LS');
    expect(onSearch).toHaveBeenCalledWith('save to LS');
  });

  test('should trim whitespace from search input before saving', () => {
    const { input, button, onSearch } = setup();
    fireEvent.change(input, { target: { value: '  trim  ' } });
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith('trim');
    expect(onSearch).not.toHaveBeenCalledWith('  trim  ');
    expect(onSearch).not.toHaveBeenCalledWith('');
  });

  test('should trigger search callback with correct parameters', () => {
    const { input, button, onSearch } = setup();
    fireEvent.change(input, { target: { value: 'correct' } });
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith('correct');
    expect(onSearch).not.toHaveBeenCalledWith('');
    expect(onSearch).not.toHaveBeenCalledWith('undefined');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  test('should not trigger search callback when search did not change', () => {
    localStorage.setItem('lastSearch', 'react');
    const { input, button, onSearch } = setup();
    fireEvent.change(input, {
      target: { value: 'react' },
    });
    fireEvent.click(button);
    expect(onSearch).not.toHaveBeenCalled();
  });
});
