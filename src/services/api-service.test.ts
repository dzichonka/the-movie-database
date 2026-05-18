import { afterEach, describe, expect, test, vi } from 'vitest';
import { apiService } from './api-service';

describe('ApiService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should fetch popular movies', async () => {
    const mockResponse = {
      results: [{ title: 'Harry Potter' }],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const data = await apiService.getAllMovies();

    expect(fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular',
      expect.objectContaining({
        method: 'GET',
      })
    );

    expect(data).toEqual(mockResponse);
  });
});
