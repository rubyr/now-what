import React, { ReactElement, useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import { searchResult } from "../../types";
import ResultsPage from "../ResultsPage/ResultsPage";
import { apiCalls } from "../../apiCalls";
import FavoritesList from "../FavoritesPage/FavoritesList";
import TitlePage from "../TitlePage/TitlePage";

//state should be empty
//eventually state will hold the user's search term
//need another method in this function maybe that will be passed to search form

function App(): ReactElement {
  const [results, setResults] = useState<searchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // load favorites on startup
    const lsFaves = localStorage.getItem("favorites");
    if (lsFaves) {
      setFavorites(JSON.parse(lsFaves));
    }
  }, []);

  useEffect(() => {
    // save favorites when updated
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string): void => {
    if (!favorites.includes(id)) setFavorites([...favorites, id]);
    else setFavorites(favorites.filter((f) => f !== id));
  };

  const searchTerm = async (searchTerm: string) => {
    //needs to do a fetch call based on the search term and console log results
    setError(null);
    setIsLoading(true);
    const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
    const modifiedSearchTerm: string = searchTerm.split(" ").join("+");
    const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${modifiedSearchTerm}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=5`;

    // const data = await fetch(url)
    // let data = await apiCalls(searchTerm);
    apiCalls(searchTerm)
      .then((response) =>
        response.ok ? response.json() : setError(response.status)
      )
      .then((response) => 
        response ? setResults([...response.Similar.Info, ...response.Similar.Results]) : null
      )
      .catch((err) => setError(err));
  
    setIsLoading(false);
  };

  //how would I do this in react?
  //that's a good question lol
  //I'm just trying to get the component to even show up.
  //I would probably use match params somehow to connect the current URL with the actual url
  //could find the name that in the app state that actually matches the current url

  return (
    <main className="App">
      <Header />
      {error && (
        <h3 className="error">
          We're sorry, but there seems to have been an issue. Please refresh the
          page and try again. (Error code: {error})
        </h3>
      )}
      <Switch>
        <Route path="/favorites">
          <FavoritesList
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </Route>
        <Route path="/search/:query"></Route>
        {results && <Route
          path="/title/:name"
          render={({ match }) => {
            const { name } = match.params;
            const regularName = name.split('+').join(' ')
            console.log(results);
            const matchedName: searchResult | any = results.find((result) =>
              result.Name.includes(regularName)
            );
            console.log(matchedName)
            return <TitlePage item={matchedName}/>;
          }}
        ></Route>}
        <Route exact path="/">
          <SearchForm searchTerm={searchTerm} />
          {isLoading && <p>Finding matches...</p>}
          {results.length !== 0 && (
            <ResultsPage
              results={results}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              isFavoriteView={false}
            />
          )}
        </Route>
      </Switch>
    </main>
  );
}

export default App;
