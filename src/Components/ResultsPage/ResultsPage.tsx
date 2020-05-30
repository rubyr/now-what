import React from "react";
import { searchResult } from "../../types";
import Result from "../Result/Result";
import "./ResultsPage.css";

interface Props {
  results: searchResult[];
  toggleFavorite: (id: string) => void;
  favorites: string[];
}

const ResultsPage = (props: Props) => {
  const results = props.results.map((r) => (
    <Result
      key={r.Name}
      data={r}
      toggleFavorite={props.toggleFavorite}
      favorite={props.favorites.includes(`${r.Type}:${r.Name}`)}
    />
  ));
  return <div className="ResultsPage">{results}</div>;
};

export default ResultsPage;
