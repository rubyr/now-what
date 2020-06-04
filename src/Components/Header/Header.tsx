import React, { useState, ReactElement, SyntheticEvent } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

interface Props {
  searchTerm: (term: string) => void;
  clearResults: () => void;
}

const Header: React.FC<Props> = (props: Props): ReactElement => {
  const [searchInput, updateSearchInput] = useState("");
  const [showSearch, updateShowSearch] = useState(false);

  const handleClick = (e: SyntheticEvent): void => {
    props.searchTerm(searchInput);
    props.clearResults();
    clearSearch();
  };

  const clearSearch = (): void => {
    updateSearchInput("");
  };

  return (
    <header>
      <Link to="/" className="homepage-link">
        <section className="title-section">
          <button
            className="now-what-button"
            onClick={() => props.clearResults()}
          >
            <h1 className="now-what-text">Now What!?</h1>
          </button>
        </section>
      </Link>
      <section className="actions">
        <Link to="/favorites" className="navlink">
          <p className="favorites">FAVORITES</p>
        </Link>
        <form className={`header-form${showSearch ? " show" : ""}`}>
          <input
            type="text"
            name="search"
            placeholder="search..."
            className="header-search"
            value={searchInput}
            onChange={(e) => updateSearchInput(e.target.value)}
            aria-label="search"
          />
          <Link to="/">
            <button className="header-search-button" onClick={handleClick}>
              Search
            </button>
          </Link>
        </form>
        <img
          src="/images/search.svg"
          alt="search"
          tabIndex={0}
          role="button"
          onClick={() => updateShowSearch(!showSearch)}
        />
      </section>
    </header>
  );
};

export default Header;
