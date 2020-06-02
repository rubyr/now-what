import React, { ReactElement, useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import { searchResult } from "../../types";
import ResultsPage from "../ResultsPage/ResultsPage";
import { findSimilar } from "../../apiCalls";
import FavoritesList from "../FavoritesPage/FavoritesList";
import TitlePage from "../TitlePage/TitlePage";

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
    // const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
    // const modifiedSearchTerm: string = searchTerm.split(" ").join("+");
    // const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${modifiedSearchTerm}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=5`;

    // const data = await fetch(url)
    // let data = await apiCalls(searchTerm);
    findSimilar(searchTerm)
      .then((response) =>
        response.ok ? response.json() : setError(response.status)
      )
      .then((response) =>
        response
          ? setResults([...response.Similar.Info, ...response.Similar.Results])
          : null
      )
      .catch((err) => setError(err));

    setIsLoading(false);
  };

  const clearResults = () => {
    setResults([])
  }
  //how would I do this in react?
  //that's a good question lol
  //I'm just trying to get the component to even show up.
  //I would probably use match params somehow to connect the current URL with the actual url
  //could find the name that in the app state that actually matches the current url

  return (
    <main className="App">
      <Header searchTerm={searchTerm} clearResults={clearResults}/>
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
        <Route
          path="/title/:name"
          render={({ match }) => {
            const { name } = match.params;
            //everything in here is making this run twice. Why?
            // const regularName = name.split("+").join(" ");
            // const matchedName: searchResult | any = results.find((result) =>
            //   result.Name.includes(regularName)
            // );
            // console.log(matchedName);
            // console.log(results, isLoading, error, favorites)
            return (
              <TitlePage
                url={name}
                toggleFavorite={toggleFavorite}
                isFavorite={(id: string) => favorites.includes(id)}
              />
            );

            // may need to keep matchedName and just tweak it
            //
          }}
        ></Route>
        <Route exact path="/">
          <SearchForm searchTerm={searchTerm} />
          {isLoading && <p>Finding matches...</p>}
          {results.length !== 0 && (
            <ResultsPage
              results={results}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          )}
        </Route>
      </Switch>
    </main>
  );
}

export default App;
