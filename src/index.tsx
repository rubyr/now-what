import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./Components/App/App";

ReactDOM.render(
  <BrowserRouter basename="https://rubyr.github.io/now-what">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
