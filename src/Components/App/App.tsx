import React, {
  ReactElement,
  useEffect,
  MouseEvent,
  SyntheticEvent,
} from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header"

//state should be empty
//eventually state will hold the user's search term
//need another method in this function maybe that will be passed to search form

function App(): ReactElement {
  interface searchResults {
    Name: string;
    Type: string;
    wTeaser: string;
    wUrl: string;
    yUrl: string;
    yID: string;
  }
  const searchTerm = async (searchTerm: string): Promise<searchResults[]> => {
    //needs to do a fetch call based on the search term and console log results
    const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`
    const modifiedSearchTerm: string = searchTerm.split(" ").join("+");
    const response = await fetch(
      `${corsAnywhere}https://tastedive.com/api/similar?q=${modifiedSearchTerm}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=5`
    );
    const data = await response
      .json()
      .then((data) => data)
      .catch((err) => console.log(err));
    console.log(data);
    return data;
  };

  const click = (term?: string): void => {
    console.log("did it");
  };
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/search/:query"></Route>
        <Route exact path="/">
          <SearchForm searchTerm={searchTerm} click={click} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
