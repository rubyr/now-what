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
import EditorsChoice from "../EditorsChoice/EditorsChoice";

function App(): ReactElement {
  const [results, setResults] = useState<searchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const lsFaves = localStorage.getItem("favorites");
    if (lsFaves) {
      setFavorites(JSON.parse(lsFaves));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string): void => {
    if (!favorites.includes(id)) setFavorites([...favorites, id]);
    else setFavorites(favorites.filter((f) => f !== id));
  };

  const searchTerm = async (searchTerm: string) => {
    setError(null);
    setIsLoading(true);
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
    setResults([]);
  };

  return (
    <main className="App">
      <Header searchTerm={searchTerm} clearResults={clearResults} />
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
            return (
              <TitlePage
                url={name}
                toggleFavorite={toggleFavorite}
                isFavorite={(id: string) => favorites.includes(id)}
              />
            );
          }}
        ></Route>
        <Route exact path="/">
          <SearchForm searchTerm={searchTerm} />
          {isLoading && <p>Finding matches...</p>}
          {results.length !== 0 ? (
            <ResultsPage
              results={results}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ) : (
            <EditorsChoice
              toggleFavorite={toggleFavorite}
              isFavorite={(id: string) => favorites.includes(id)}
            />
          )}
        </Route>
      </Switch>
    </main>
  );
}

export default App;
