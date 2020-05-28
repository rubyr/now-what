import React from "react";
import { searchResult } from "../../types";
import "./Result.css";
import { Link } from "react-router-dom";

interface Props {
  data: searchResult;
}

const Result = (props: Props) => {
  const { Name } = props.data;
  const link = `/title/${Name.replace(/\s/g, "+")}`;
  return (
    <Link to={link}>
      <div className="Result">
        <h3>{Name}</h3>
        <div className="fakeImage"></div>
      </div>
    </Link>
  );
};

export default Result;
