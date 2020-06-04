import React, { useState, useEffect } from "react";
import { getEditorsChoice } from "../../apiCalls";
import { searchResult } from "../../types";
import Result from "../Result/Result";
import "./EditorsChoice.css";

interface Props {
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const EditorsChoice = (props: Props) => {
  const [titles, setTitles] = useState<searchResult[]>([]);

  useEffect(() => {
    async function getTitles() {
      const data = await getEditorsChoice();
      setTitles(data);
    }
    getTitles();
  }, []);

  const getTitlesOfType = (type: string) => {
    return titles.filter((t) => t.Type === type);
  };

  const types = ["movie", "show", "game", "music"];

  const results = types.map((type) => (
    <div className="editor-pick-section" key={type}>
      <h3 className="editor-pick-section-header">
        Editor's Picks: {type !== 'music'? type + "s" : 'artists'}
      </h3>
      {getTitlesOfType(type).map((t) => (
        <Result
          data={t}
          toggleFavorite={props.toggleFavorite}
          favorite={props.isFavorite(`${t.Type}:${t.Name}`)}
          type=""
          key={t.yID}
        />
      ))}
    </div>
  ));

  return <div className="Editors-Choice">{results}</div>;
};

export default EditorsChoice;
