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
  //what goes in here though?
  //I was going to pass down a function 

  // searchTerm: async (term: string): Promise<searchResults[]> => {
  //     //needs to do a fetch call based on the search term and console log results 
  //     const modifiedSearchTerm: string = term.split(' ').join('+')
  //     const response  = await fetch(`https://tastedive.com/api/similar?q=${modifiedSearchTerm}&verbose=1`);
  //     const data = await response.json();
  //     return data;
  // }
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
      {/* <button onClick={(query: string, event:MouseEvent<HTMLButtonElement>) => props.searchTerm}>Search</button> */}
      <button onClick={() => props.searchTerm(query)}>Search</button>
    </form>
  );
};

//now state is being set using usestate and query is now whatever you type in the box 
//want to do a fetch request somewhere when you click the button based on what's in state 
export default SearchForm;
