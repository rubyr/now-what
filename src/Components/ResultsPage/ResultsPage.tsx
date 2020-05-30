import React from "react";
import { searchResult } from "../../types";
import Result from "../Result/Result";
import "./ResultsPage.css";

interface Props {
  results: searchResult[];
  searchItem: searchResult[];
}

const ResultsPage = (props: Props) => {
  console.log(props.searchItem)
  console.log(props.results)
  const results = props.results.map((r) => <Result key={r.yID} data={r} />);
  const searchItem = props.searchItem.map((r) => <Result key={r.yID} data={r} />);

  return (
      <div className="ResultsPage">
        <section className="search-item-display">
          <h2>Main Title</h2>
          {searchItem}
        </section>
        <h2>Related Titles</h2>
        {results}
      </div>
  )
};

export default ResultsPage;
