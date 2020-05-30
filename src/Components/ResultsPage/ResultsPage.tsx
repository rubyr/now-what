import React from "react";
import { searchResult } from "../../types";
import Result from "../Result/Result";
import "./ResultsPage.css";

interface Props {
  results: searchResult[];
}

const ResultsPage = (props: Props) => {
  const results = props.results.map((r) => (
    <Result key={r.yID} data={r} toggleFavorite={() => {}} />
  ));
  return <div className="ResultsPage">{results}</div>;
};

export default ResultsPage;
