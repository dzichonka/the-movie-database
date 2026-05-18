import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchProps = {
  onSearch: (search: string) => void;
};
const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState(
    localStorage.getItem('lastSearch') || ''
  );

  const handleSearch = (event: React.SubmitEvent): void => {
    event?.preventDefault();

    const trimmedSearch = search.trim();

    if (trimmedSearch === localStorage.getItem('lastSearch')) {
      return;
    }

    localStorage.setItem('lastSearch', trimmedSearch);
    onSearch(trimmedSearch);
  };

  return (
    <form onSubmit={handleSearch} className="form">
      <label className="label" htmlFor="search">
        <input
          className="input"
          type="text"
          id="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>
      <button className="btn-icon" type="submit">
        <BsSearch />
      </button>
    </form>
  );
};
export default Search;
