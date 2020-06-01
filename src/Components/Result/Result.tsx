import React, { useState, useEffect } from "react";
import { searchResult } from "../../types";
import "./Result.css";
import { Link } from "react-router-dom";
import wiki from "wikijs";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

interface Props {
  data: searchResult;
  toggleFavorite: (id: string) => void;
  favorite: boolean;
  type: string;
}

const Result = (props: Props) => {
  const { Name, wUrl, Type } = props.data;
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
    <article className="Result">
      <Link to={link}>
        <h3>{Name}</h3>

        <img src={imageUrl} alt={Name} className="result-card-image" />
      </Link>
      <FavoriteButton
        toggleFavorite={() => props.toggleFavorite(Type + ":" + Name)}
        favorite={props.favorite}
      />
    </article>
  );
};

export default Result;
