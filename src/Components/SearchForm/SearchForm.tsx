import React, { useState, useEffect, MouseEvent } from "react";
import "./SearchForm.css";

interface searchResults {
  Name: string,
  Type: string,
  wTeaser: string,
  wUrl: string,
  yUrl: string,
  yID: string,

}

interface Props {
  searchTerm: (term:string) => Promise<searchResults[]>;
  click: (term?: string) => void;
  }


const SearchForm: React.FC<Props>= (props: Props) => {
  console.log(props)
  const [query, setQuery] = useState("");
  console.log(query)
  return (
    <form className="SearchForm" onSubmit={(e) => e.preventDefault()}>
      {/* placeholder is just for tests, you can change it if you like (just update the tests, too) */}

      <input placeholder="Search for a title" onChange={(e) => setQuery(e.target.value)} value={query}/>
      <button onClick={() => props.searchTerm(query)}>Search</button>
    </form>
  );
};

export default SearchForm;
