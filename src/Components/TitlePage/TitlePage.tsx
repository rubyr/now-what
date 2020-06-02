import React, { useState, useEffect } from "react";
import { searchResult } from "../../types";
import "./TitlePage.css";
// import youtube from '../../../public/images/youtube_logo.png'
import { findTitleInfo } from "../../apiCalls";
import { setConstantValue } from "typescript";

interface Props {
  // item?: searchResult;
  url: string;
}

//I'm trying to make a fetch call
//based on the url, I want to make a fetch call to that endpoint of the api
//it should then display the appropriate information on the page
//the title page is being run twice
//my fetch call was being run twice, too
//I don't know how to use useeffect effectively

//why is the fetch call sending so many requests? It sends at least two no matter what I do.
//I don't get why I can't seem to add the results of the fetch call to state
//should I just save it in a variable?
// const FavoritesList = (props: Props) => {
//   const [results, setResults] = useState<searchResult[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       const { Similar } = await fetchFavorites(props.favorites);

//       if (Similar) setResults(Similar.Info);
//     }
//     fetchData();
//   }, [props.favorites]);

//normally I would do this in a separate file but handle in component did mount, I think
//then I would pass down the information as a prop
//I would invoke the function on page load?
//that doesn't make sense

const TitlePage: React.FC<Props> = (props: Props) => {
  // debugger;
  // const actualTitle: string = props.name.split('+').join(' ')
  const [results, setResults] = useState<searchResult[]>([]); // const [info, setInfo] = useState([]);
  const [info, setInfo] = useState<searchResult[]>([]); // const [info, setInfo] = useState([]);
  //don't need to set title
  //do I really need to set state?
  // setTitle(props.name.split('+').join(' '))
  console.log("happening");
  //do fetch call here?
  //props.name only exists...when?
  //props.name exists if you are not coming from the search results
  console.log(props.url);
  // console.log(title)

  // let results: {Results: object}[] = [];
  // let info: {Info: object}[] = [];
  useEffect(() => {
    async function retrieveInfo() {
      const allData = await findTitleInfo(props.url)
        // .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          if (data) {
            // results.push(data.Similar.Results);
            // info.push(...data.Similar.Info)
            setResults(data.Similar.Results);
            setInfo(data.Similar.Info);
            return data;
            // console.log(data.Similar.Results)
          }
        });
    }
    retrieveInfo();
    return setResults([]);
  }, [props.url]);

  // console.log(results);
  // console.log(info[0].Name)

  // .then((data) => console.log(results));

  // console.log(randomArray)
  // .then((info) => setResults(info));
  // .then(response => setTitle({...response.Similar}))
  // .then((data) => console.log(results));
  //why is this happening twice?
  // return (
  //   <section>
  //     <h4>Hi</h4>
  //   </section>
  // );
  if (!results.length || !info.length) {
    return (
      <section>
        <h5>Loading...</h5>
      </section>
    );
  } else {
    return (
      <section className="title-page">
        <aside className="title-overview">
          <h4>{info[0].Name}</h4>
          <figure className="result-card-image-placeholder"></figure>
          <a
            href={info[0].yUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
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
            <a
              href={info[0].wUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
            Read more...
            </a>
          </p>
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
