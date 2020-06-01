import React, { useState, useEffect } from "react";
import ResultsPage from "../ResultsPage/ResultsPage";
import { searchResult } from "../../types";
import { fetchFavorites } from "../../apiCalls";

interface Props {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const FavoritesList = (props: Props) => {
  const [results, setResults] = useState<searchResult[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { Similar } = await fetchFavorites(props.favorites).catch(
        console.error // might want to do something better here
      );

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
