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

    const trimmedSearch = this.state.search.trim();

    if (trimmedSearch === localStorage.getItem('lastSearch')) {
      return;
    }

    localStorage.setItem('lastSearch', trimmedSearch);
    this.props.onSearch(trimmedSearch);
  };
  render() {
    return (
      <form onSubmit={this.handleSearch} className="form">
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
