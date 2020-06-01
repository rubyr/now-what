import React, { useState } from "react";
import { searchResult } from "../../types";
import Result from "../Result/Result";
import "./FavoritesDisplay.css";
import { access } from "fs";

interface Props {
  results: searchResult[];
  toggleFavorite: (id: string) => void;
  favorites: string[];
}

interface ResultsObj {
    [key: string]: JSX.Element[];
}

const FavoritesDisplay = (props: Props) => {
    const resultsObj = props.results.reduce((acc: ResultsObj, r) => {
       const resultJSX = (<Result
        key={r.Name}
        data={r}
        toggleFavorite={props.toggleFavorite}
        favorite={props.favorites.includes(`${r.Type}:${r.Name}`)}
        type={r.Type}
        />)
        if (!acc[r.Type]) {
            acc[r.Type] = []
        }
        acc[r.Type].push(resultJSX)

    return acc;
}, {});

  return (
    <div className="favorites-display">
       <h2>Favorites</h2>
       <section className="favorites-section">
       {resultsObj.movie && <h3>Movies</h3>}
       {resultsObj.movie}
       </section>
       <section className="favorites-section">
       {resultsObj.show && <h3>TV Shows</h3>}
       {resultsObj.show}
       </section>
       <section className="favorites-section">
       {resultsObj.game && <h3>Games</h3>}
       {resultsObj.game}
       </section>
       <section className="favorites-section">
       {resultsObj.music && <h3>Music</h3>}
       {resultsObj.music}
       </section>
       <section className="favorites-section">
       {resultsObj.book && <h3>Books</h3>}
       {resultsObj.book}
       </section>
       <section className="favorites-section">
       {resultsObj.author && <h3>Authors</h3>}
       {resultsObj.author}
       </section>
       <section className="favorites-section">
       {resultsObj.podcasts && <h3>Podcasts</h3>}
       {resultsObj.podcasts}
       </section>
    </div>
  )
};

export default FavoritesDisplay;
