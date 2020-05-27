import React, { ReactElement } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";

function App(): ReactElement {
  return (
    <div className="App">
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
