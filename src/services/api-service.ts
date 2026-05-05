import type { Response } from '../types/api-types';

class ApiService {
  private _apiBase = 'https://api.themoviedb.org/3/search/movie';

  private getResource = async <T>(url: string): Promise<T> => {
    console.log('token', import.meta.env.VITE_TMDB_TOKEN);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return (await res.json()) as T;
  };

  public getMovie = async (): Promise<Response> => {
    const url = this._apiBase;
    return this.getResource<Response>(url);
  };

  public getAllMovies = async (
    page: number = 1,
    queryText: string = ''
  ): Promise<Response> => {
    const query = new URLSearchParams({
      query: queryText,
      page: page.toString(),
    });

    const url = `${this._apiBase}?${query.toString()}`;
    return this.getResource<Response>(url);
  };
}

export const apiService = new ApiService();
