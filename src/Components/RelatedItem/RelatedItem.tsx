import React, { useEffect, useState } from "react";
import "./RelatedItem.css";
import { searchResult } from "../../types";
import { Link } from "react-router-dom";
import { getWikiImage } from "../../apiCalls";

interface Props {
  Name: string;
  Type: string;
  wTeaser: string;
  wUrl: string;
  yUrl: string;
  yID: string;
}

const RelatedItem: React.FC<searchResult> = (props: Props) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    async function getImage() {
      try {
        const imgurl = await getWikiImage(props.wUrl);

        if (imgurl) setImg(imgurl);
      } catch (e) {
        console.error(e);
      }
    }
    getImage();
  }, [props.wUrl]);
  return (
    <Link to={`${props.Name.split(" ").join("+")}`}>
      <section className="related-item">
        <img src={img} alt={props.Name} />
        <h5 className="related-item-title">{props.Name}</h5>
      </section>
    </Link>
  );
};

export default RelatedItem;
