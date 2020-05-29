import React, { useState, useEffect, MouseEvent } from "react";
import "./SearchForm.css";
import { searchResult } from "../../types";

interface Props {
  searchTerm: (term: string) => void;
}

const SearchForm: React.FC<Props> = (props: Props) => {
  const [query, setQuery] = useState("");
  return (
    <form className="SearchForm" onSubmit={(e) => e.preventDefault()}>
      {/* placeholder is just for tests, you can change it if you like (just update the tests, too) */}
      <label>
        <input
          placeholder="Search for a title"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && props.searchTerm(query)}
          value={query}
        />
      </label>
      <button onClick={() => props.searchTerm(query)}>Go</button>
    </form>
  );
};

export default SearchForm;
