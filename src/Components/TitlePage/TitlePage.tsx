import React, { useState, useEffect } from "react";
import { searchResult } from "../../types";
import "./TitlePage.css";
// import youtube from '../../../public/images/youtube_logo.png'

interface Props {
  item: searchResult;
}

const TitlePage: React.FC<Props> = (props: Props) => {
  // const actualTitle: string = props.name.split('+').join(' ')
  // const [title, setTitle] = useState(actualTitle);
  //don't need to set title
  //do I really need to set state?
  // setTitle(props.name.split('+').join(' '))
  return (
    <section className="title-page">
      <aside className="title-overview">
        <h4>{props.item.Name}</h4>
        <figure className="result-card-image-placeholder"></figure>
        <a href={props.item.yUrl} target="_blank" rel="noopener noreferrer">
          <img
            className="youtube-link"
            src="/images/youtube_logo.png"
            alt="youtube-logo"
          ></img>
        </a>
      </aside>
      <main className="title-detailed-info">
        <p>{props.item.wTeaser}</p>
        <p className="wiki-link">
          <a href={props.item.wUrl} target="_blank" rel="noopener noreferrer">
            Read more...
          </a>
        </p>
      </main>
    </section>
  );
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
