import React, { ReactElement } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header"

function App(): ReactElement {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/search/:query"></Route>
        <Route exact path="/">
          <SearchForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
