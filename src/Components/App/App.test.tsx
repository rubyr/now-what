import React, { ReactElement } from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import App from "./App";
import { fetchedData } from "./fetch-call-test";
import { apiCalls } from "../../apiCalls";
import "@testing-library/jest-dom/extend-expect";
import { mocked } from "ts-jest/utils";
jest.mock("../../apiCalls");

// const searchResults = mocked('../../apiCalls', true);

describe("App", () => {
  it("should render the App", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const element = getByText("Now What!?");
    expect(element).toBeInTheDocument();
  });

  it("should do nothing if a user searches an empty string or nothing", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.click(getByText("Go"));
    //what should happen here?
    ////////this expect statement needs to be fixed
    expect();
  });

  it.only("should display search results if the search term isn't an empty string", () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText(/title/i), {
      target: { value: "pulp fiction" },
    });
    mocked(apiCalls).mockResolvedValueOnce(fetchedData.Similar.Results)
    fireEvent.click(getByText("Go"));
    expect(getByText("Fight Club")).toBeInTheDocument();
  });

  //if search button is clicked and there is a search term, should find relevant search items
  //mock fetch call  - pull it out into a different file
  //maybe create test file of the similar {}
  //mocked fetch call should return the copied data (similar {})

  //if search button is clicked and there is a search term, should not find relevant search terms where none exist
});
