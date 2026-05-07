import type { Response } from '../types/api-types';

class ApiService {
  private _apiSerch = 'https://api.themoviedb.org/3/search/movie';
  private _apiPopular = 'https://api.themoviedb.org/3/movie/popular';

  private getResource = async <T>(url: string): Promise<T> => {
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

  public getAllMovies = async (
    page: number = 1,
    queryText: string = ''
  ): Promise<Response> => {
    const query = new URLSearchParams({
      query: queryText,
      page: page.toString(),
    });
    const url = queryText
      ? `${this._apiSerch}?${query.toString()}`
      : this._apiPopular;
    return this.getResource<Response>(url);
  };
}

export const apiService = new ApiService();
