import React, { ReactElement } from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe('App', () => {
    it("should render the App", () => {
      const { getByText } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      const element = getByText("Now What!?");
      expect(element).toBeInTheDocument();
    });

//if search button is clicked and there is a search term, should find relevant search items
//if search button is clicked and there is a search term, should not find relevant search terms where none exist



})

