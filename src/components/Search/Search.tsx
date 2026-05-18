import { BsSearch } from 'react-icons/bs';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useState } from 'react';

type SearchProps = {
  onSearch: (search: string) => void;
};
const Search = (props: SearchProps) => {
  const { onSearch } = props;

  const [LS, setLS] = useLocalStorage<string>('lastSearch', '');
  const [search, setSearch] = useState(LS || '');

  const handleSearch = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event?.preventDefault();
    if (LS === search.trim()) return;
    setLS(search.trim());
    onSearch(search.trim());
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
