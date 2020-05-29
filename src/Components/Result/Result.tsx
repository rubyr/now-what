import React, { useState, useEffect } from "react";
import { searchResult } from "../../types";
import "./Result.css";
import { Link } from "react-router-dom";
import wiki from 'wikijs'

interface Props {
  data: searchResult;
}

const Result = (props: Props) => {
    
    const [ imageUrl, setImageUrl ] = useState('')

    const getImage = async (): Promise<void> => {
      const data = await wiki().page(props.data.Name)
      .then(page => page.mainImage())
      setImageUrl(data)
    }

    useEffect(() => { 
      getImage()
    })

  const { Name } = props.data;
  const link = `/title/${Name.replace(/\s/g, "+")}`;
  return (
    <Link to={link}>
      <div className="Result">
        {/* <div className="fakeImage"> */}
          <h3>{Name}</h3>
          <img src={imageUrl} alt="result" className="result-card-image"/>
        {/* </div> */}
      </div>
    </Link>
  );
};

export default Result;
