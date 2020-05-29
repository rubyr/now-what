import React from "react";
import { searchResult } from "../../types";
import "./Result.css";
import { Link } from "react-router-dom";
import wiki from 'wikijs'

interface Props {
  data: searchResult;
}

const Result = (props: Props) => {

  console.log(props)
  
  const { Name } = props.data;
  const link = `/title/${Name.replace(/\s/g, "+")}`;
  return (
    <Link to={link}>
      <div className="Result">
        <div className="fakeImage">
          <h3>{Name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Result;
