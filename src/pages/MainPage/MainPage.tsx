import { useEffect, useState } from 'react';
import type { Movie } from '../../types/api-types';
import { apiService } from '../../services/api-service';
import Search from '../../components/Search/Search';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Loader from '../../components/Loader/Loader';
import Result from '../../components/Results/Result';
import useLocalStorage from '../../hooks/useLocalStorage';

type MainPageState = {
  data: Movie[] | null;
  loading: boolean;
  error: string | null;
};
const MainPage = () => {
  const [state, setState] = useState<MainPageState>({
    data: null,
    loading: false,
    error: null,
  });
  const [lastSearch] = useLocalStorage('lastSearch', '');

  const handleSearch = async (search: string): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await apiService.getAllMovies(
        1,
        search.trim() ? search : ''
      );
      setState((prev) => ({ ...prev, data: response.results }));
    } catch {
      setState((prev) => ({
        ...prev,
        error: 'Failed to fetch movies, please try again',
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      await handleSearch(lastSearch);
    };

    loadMovies();
  }, [lastSearch]);

  return (
    <>
      <div className="container" data-testid="main-page">
        <Search onSearch={handleSearch} />
        {state.loading && <Loader />}
        {state.error && !state.loading && <h2>{state.error}</h2>}
        {state.data && !state.loading && !state.error && (
          <Result data={state.data} />
        )}
        <ErrorButton />
      </div>
    </>
  );
};

export default MainPage;
