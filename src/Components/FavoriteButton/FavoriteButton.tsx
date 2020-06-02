import React, { useState } from "react";
import "./FavoriteButton.css";

interface Props {
  toggleFavorite: () => void;
  favorite: boolean;
}

const FavoriteButton = (props: Props) => {
  const [imgSrc, setImgSrc] = useState(props.favorite ? "-fill" : "");
  const toggleFavorite = () => {
    props.toggleFavorite();
    const newSrc = imgSrc ? "" : "-fill";
    setImgSrc(newSrc);
  };
  return (
    <button
      onClick={toggleFavorite}
      aria-label="favorite"
      className="FavoriteButton"
    >
      <img src={`/images/favorite${imgSrc}.svg`} alt="favorite" />
    </button>
  );
};

export default FavoriteButton;
