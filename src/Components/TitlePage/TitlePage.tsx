import React, { useState, useEffect } from "react";
import { searchResult } from "../../types";
import "./TitlePage.css";
// import youtube from '../../../public/images/youtube_logo.png'
import { findTitleInfo, getWikiImage } from "../../apiCalls";
import { setConstantValue } from "typescript";
import RelatedItem from "../RelatedItem/RelatedItem";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

interface Props {
  url: string;
  toggleFavorite: (id: string) => void;
  favorites: string[];
}

const TitlePage: React.FC<Props> = (props: Props) => {
  const [results, setResults] = useState<searchResult[]>([]);
  const [info, setInfo] = useState<searchResult[]>([]);
  const [img, setImg] = useState("");

  console.log("happening");
  console.log(props.url);
  useEffect(() => {
    async function retrieveInfo() {
      const allData = await findTitleInfo(props.url).then((data) => {
        if (data) {
          setResults(data.Similar.Results);
          setInfo(data.Similar.Info);
          return data;
        }
      });
    }
    retrieveInfo();
    return setResults([]);
  }, [props.url]);
  if (!results.length || !info.length) {
    return (
      <section>
        <h5>Loading...</h5>
      </section>
    );
  } else {
    const allRelatedItems = results.map((item) => {
      return <RelatedItem {...item} key={item.yID} />;
    });
    return (
      <section className="title-page">
        <aside className="title-overview">
          <section className="title-header">
            <h4>{info[0].Name}</h4>
            <div className="title-favorite-button">
              {/* this workaround is likely not accessible */}
              <FavoriteButton
                toggleFavorite={() =>
                  props.toggleFavorite(`${info[0].Type}:${info[0].Name}`)
                }
                favorite={props.favorites.includes(
                  `${info[0].Type}:${info[0].Name}`
                )}
              />
            </div>
          </section>
          <figure className="result-card-image-placeholder"></figure>
          <a href={info[0].yUrl} target="_blank" rel="noopener noreferrer">
            <img
              className="youtube-link"
              src="/images/youtube_logo.png"
              alt="youtube-logo"
            ></img>
          </a>
        </aside>
        <main className="title-detailed-info">
          <p>{info[0].wTeaser}</p>
          <p className="wiki-link">
            <a href={info[0].wUrl} target="_blank" rel="noopener noreferrer">
              Read more...
            </a>
          </p>
            <h5>Related Items</h5>
          <section className="all-related-items">
            {allRelatedItems}</section>
        </main>
      </section>
    );
  }
};

export default TitlePage;

//what am I doing?
//so I'm just trying to connect the route to the existing link for now
// Name: "12 Angry Men"
// Type: "movie"
// wTeaser: "12 Angry Men is a 1957 American courtroom drama film directed by Sidney Lumet, adapted from a teleplay of the same name by Reginald Rose. This courtroom drama tells the story of a jury of 12 men as they deliberate the conviction or acquittal of an 18-year old defendant on the basis of reasonable doubt, forcing the jurors to question their morals and values.12 Angry Men explores many techniques of consensus-building and the difficulties encountered in the process among this group of men whose range of personalities adds to the intensity and conflict. It also explores the power one person has to elicit change. The jury members are identified only by number; no names are revealed until an exchange of dialogue at the very end. The film forces the characters and audience to evaluate their own self-image through observing the personality, experiences, and actions of the jurors. The film is also notable for its almost exclusive use of one set, where all but three minutes of the film takes place."
// wUrl: "https://en.wikipedia.org/wiki/12_Angry_Men_(1957_film)"
// yID: "_13J_9B5jEk"
// yUrl: "https://www.youtube-nocookie.com/embed/_13J_9B5jEk"
