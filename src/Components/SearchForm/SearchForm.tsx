import React, { useState } from "react";
import "./SearchForm.css";

interface Props {}

const SearchForm = (props: Props) => {
  const [query, setQuery] = useState("");
  return (
    <form className="SearchForm">
      {/* placeholder is just for tests, you can change it if you like (just update the tests, too) */}
      <input placeholder="Search for a title" />
      <button onClick={(e) => e.preventDefault()}>Search</button>
    </form>
  );
};

export default SearchForm;
