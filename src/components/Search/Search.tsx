import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchProps = {
  onSearch: (search: string) => void;
};
type SearchState = {
  search: string;
};

class Search extends Component<SearchProps> {
  state: SearchState = {
    search: localStorage.getItem('lastSearch') || '',
  };

  handleSearch = (event: React.SubmitEvent): void => {
    event?.preventDefault();
    if (
      !this.state.search.trim() ||
      this.state.search.trim() === localStorage.getItem('lastSearch')
    ) {
      return;
    }
    localStorage.setItem('lastSearch', this.state.search.trim());
    this.props.onSearch(this.state.search.trim());
  };
  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <label className="label" htmlFor="search">
          <input
            className="input"
            type="text"
            id="search"
            value={this.state.search}
            onChange={(event) => this.setState({ search: event.target.value })}
          />
        </label>
        <button className="btn-icon" type="submit">
          <BsSearch />
        </button>
      </form>
    );
  }
}
export default Search;
