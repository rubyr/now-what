import React from "react";
import { searchResult } from "../../types";
import Result from "../Result/Result";

interface Props {
  results: searchResult[];
}

const ResultsPage = (props: Props) => {
  const results = props.results.map((r) => <Result data={r} />);
  return <div>{results}</div>;
};

export default ResultsPage;
