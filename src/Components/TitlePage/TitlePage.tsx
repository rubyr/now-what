import React, { useState, useEffect } from "react";

interface Props {}

const TitlePage: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState("");
  return (
    <section>
      <h1>Hi</h1>
    </section>
  );
};

export default TitlePage;

//what am I doing?
//so I'm just trying to connect the route to the existing link for now

