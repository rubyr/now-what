import React, { useState, useEffect } from "react";
import { searchResult } from "../../types";
import "./TitlePage.css";
import { findTitleInfo, getWikiImage } from "../../apiCalls";
import RelatedItem from "../RelatedItem/RelatedItem";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

interface Props {
  url: string;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const TitlePage: React.FC<Props> = (props: Props) => {
  const [results, setResults] = useState<searchResult[]>([]);
  const [info, setInfo] = useState<searchResult[]>([]);
  const [img, setImg] = useState("");

  useEffect(() => {
    async function retrieveInfo() {
      const data = await findTitleInfo(props.url);
      if (data) {
        setResults(data.Similar.Results);
        setInfo(data.Similar.Info);

        try {
          const wUrl = (data.Similar.Info[0] as searchResult).wUrl;
          const imgUrl = await getWikiImage(wUrl);

          if (imgUrl) setImg(imgUrl);
        } catch (e) {
          setImg("");
        }

        return data;
      }
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
            <h1 className="title-title">{info[0].Name}</h1>
            <FavoriteButton
              toggleFavorite={() =>
                props.toggleFavorite(`${info[0].Type}:${info[0].Name}`)
              }
              favorite={props.isFavorite(`${info[0].Type}:${info[0].Name}`)}
            />
          </section>
          {img.length && (
            <img src={img} alt={info[0].Name} className="title-image" />
          )}
          <figure className="title-image"></figure>
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
          <h3>Related Items</h3>
          <section className="all-related-items">
            {results && allRelatedItems}
          </section>
        </main>
      </section>
    );
  }
};

export default TitlePage;
