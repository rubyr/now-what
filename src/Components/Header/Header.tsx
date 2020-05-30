import React, { useState, ReactElement, SyntheticEvent } from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";

interface Props {}

const Header: React.FC<Props> = (): ReactElement => {
  const [searchInput, updateSearchInput] = useState("");

  const handleClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    clearSearch();
  };

  const clearSearch = (): void => {
    updateSearchInput("");
  };

  // if not doing SPA, maybe conditional render search bar when not at home screen?

  return (
    <header>
      <Link to="/">
        <section className="title-section">
          <h1>Now What!?</h1>
        </section>
      </Link>
      <NavLink to="/favorites">Favorites</NavLink>
      <form className="header-form">
        <input
          type="text"
          name="search"
          placeholder="search..."
          className="header-search"
          value={searchInput}
          onChange={(e) => updateSearchInput(e.target.value)}
        />
        <button className="header-search-button" onClick={handleClick}>
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
