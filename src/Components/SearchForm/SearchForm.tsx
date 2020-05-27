import React, { useState } from "react";
import "./SearchForm.css";

interface Props {}

const SearchForm = (props: Props) => {
  const [query, setQuery] = useState("");
  return (
    <form className="SearchForm">
      <input />
      <button onClick={(e) => e.preventDefault()}>Search</button>
    </form>
  );
};

export default SearchForm;
