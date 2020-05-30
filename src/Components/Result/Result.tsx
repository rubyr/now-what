import React, { useState, useEffect } from "react";
import { searchResult } from "../../types";
import "./Result.css";
import { Link } from "react-router-dom";
import wiki from "wikijs";

interface Props {
  data: searchResult;
}

const Result = (props: Props) => {
  const { Name, wUrl } = props.data;
  const link = `/title/${Name.replace(/\s/g, "+")}`;

  const [imageUrl, setImageUrl] = useState("");

  const getImage = async (): Promise<void> => {
    try {
      const title = decodeURI(`${wUrl.split("/").pop()}`);

      const url = await wiki()
        .page(title)
        .then((page) => page.mainImage())
        .catch((err) => console.error(err));

      if (url) setImageUrl(url);
    } catch {
      try {
        const url = await wiki()
          .page(Name)
          .then((page) => page.mainImage())
          .catch((err) => console.error(err));

        if (url) setImageUrl(url);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getImage();
  });

  return (
    <Link to={link}>
      <div className="Result">
        <h3>{Name}</h3>
        <img src={imageUrl} alt={Name} className="result-card-image" />
      </div>
    </Link>
  );
};

export default Result;
