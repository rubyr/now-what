import React, {
  ReactElement,
  useEffect,
  MouseEvent,
  SyntheticEvent,
  useState,
} from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import { searchResult } from "../../types";
import ResultsPage from "../ResultsPage/ResultsPage";

//state should be empty
//eventually state will hold the user's search term
//need another method in this function maybe that will be passed to search form

function App(): ReactElement {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [ searchItem, setSearchItem ] = useState([])

  const searchTerm = async (searchTerm: string) => {
    //needs to do a fetch call based on the search term and console log results
    setError(null);
    setIsLoading(true);
    const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
    const modifiedSearchTerm: string = searchTerm.split(" ").join("+");
    const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${modifiedSearchTerm}&verbose=1&k=372838-DavePern-7J59GJ8D`;

    const data = await fetch(url)
      .then((response) =>
        response.ok ? response.json() : setError(response.status)
      )
      .catch((err) => setError(err));
    if (data) {
      setResults(data.Similar.Results);
      setSearchItem(data.Similar.Info)
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <Header />
      {error && (
        <h3 className="error">
          We're sorry, but there seems to have been an issue. Please refresh the
          page and try again. (Error code: {error})
        </h3>
      )}
      <Switch>
        <Route path="/search/:query"></Route>
        <Route exact path="/">
          <SearchForm searchTerm={searchTerm} />
        </Route>
      </Switch>
      {isLoading && <p>Finding matches...</p>}
      {results.length !== 0 && <ResultsPage results={results} searchItem={searchItem}/>}
    </div>
  );
}

export default App;
