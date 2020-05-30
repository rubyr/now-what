import React, { useState } from "react";
import "./FavoriteButton.css";

interface Props {
  toggleFavorite: () => void;
}

const FavoriteButton = (props: Props) => {
  const [imgSrc, setImgSrc] = useState("");
  const toggleFavorite = () => {
    props.toggleFavorite();
    const newClass = imgSrc ? "" : "-fill";
    setImgSrc(newClass);
  };
  return (
    <button
      onClick={toggleFavorite}
      aria-label="favorite"
      className="FavoriteButton"
    >
      <img src={`images/favorite${imgSrc}.svg`} alt="favorite" />
    </button>
  );
};

export default FavoriteButton;
