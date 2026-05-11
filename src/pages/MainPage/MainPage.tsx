import { Component } from 'react';
import type { Movie } from '../../types/api-types';
import { apiService } from '../../services/api-service';
import Search from '../../components/Search/Search';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Loader from '../../components/Loader/Loader';
import Result from '../../components/Results/Result';

type MainPageState = {
  data: Movie[] | null;
  loading: boolean;
  error: string | null;
};
class MainPage extends Component {
  state: MainPageState = {
    data: null,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    this.setState({ loading: true, error: null });
    await this.handleSearch(lastSearch);
  }

  handleSearch = async (search: string): Promise<void> => {
    this.setState({ loading: true, error: null });
    try {
      const response = await apiService.getAllMovies(
        1,
        search.trim() ? search : ''
      );
      this.setState({ data: response.results });
    } catch {
      this.setState({ error: 'Failed to fetch movies, please try again' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <Search onSearch={this.handleSearch} />
          {this.state.loading && <Loader />}
          {this.state.error && !this.state.loading && (
            <h2>{this.state.error}</h2>
          )}
          {this.state.data && !this.state.loading && !this.state.error && (
            <Result data={this.state.data} />
          )}
          <ErrorButton />
        </div>
      </>
    );
  }
}
export default MainPage;
