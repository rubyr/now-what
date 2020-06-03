import React, { useState, useEffect, MouseEvent } from "react";
import "./SearchForm.css";
import { searchResult } from "../../types";

interface Props {
  searchTerm: (term: string) => void;
}

const SearchForm: React.FC<Props> = (props: Props) => {
  const [query, setQuery] = useState("");

  const search = () => {
    if (query.trim()) {
      props.searchTerm(query.trim());
      setQuery(query.trim());
    }
  };
  return (
    <section className="form-background">
      {/* <img
        src="images/mainpage-background.jpg"
        className="form-background-image"
      >
      </img> */}
      <section className="text-container">

      <h1 className="main-page-text">Hi</h1>
      </section>
      <section className="form-container">
        <form className="SearchForm" onSubmit={(e) => e.preventDefault()}>
          <input
            placeholder="Search for a title"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            value={query}
            aria-label="Title Search"
          />
          <button onClick={search}>Search</button>
        </form>
      </section>
    </section>
  );
};

export default SearchForm;
