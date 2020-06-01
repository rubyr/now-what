import React, { useState, useEffect } from "react";
import ResultsPage from "../ResultsPage/ResultsPage";
import { searchResult } from "../../types";

interface Props {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const FavoritesList = (props: Props) => {
  const [results, setResults] = useState<searchResult[]>([]);

  useEffect(() => {
    async function fetchData() {
      const corsAnywhere: string = `https://cors-anywhere.herokuapp.com/`;
      const media: string = props.favorites.join("%2C");
      const url = `${corsAnywhere}https://tastedive.com/api/similar?q=${media}&verbose=1&k=372838-DavePern-7J59GJ8D&limit=1`;

      const { Similar } = await fetch(url)
        .then((response) => response.json())
        .catch((err) => console.error(err));

      if (Similar) setResults(Similar.Info);
    }
    fetchData();
  }, [props.favorites]);

  return props.favorites.length ? (
    <ResultsPage
      results={results}
      toggleFavorite={props.toggleFavorite}
      favorites={props.favorites}
    />
  ) : (
    <p>Nothing favorited yet. Add some to see them here!</p>
  );
};

export default FavoritesList;
