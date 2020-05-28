import React from "react";
import { searchResult } from "../../types";

interface Props {
  data: searchResult;
}

const Result = (props: Props) => {
  const { Name } = props.data;
  return <div>{Name}</div>;
};

export default Result;
