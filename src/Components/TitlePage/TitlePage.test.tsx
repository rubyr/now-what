import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import TitlePage from "./TitlePage";
import { act } from "react-dom/test-utils";
import { fetchedData, smallerfetchedData } from "../App/fetch-call-test";
import {
  findSimilar,
  fetchFavorites,
  findTitleInfo,
  getWikiImage,
} from "../../apiCalls";
import "@testing-library/jest-dom/extend-expect";
import { mocked } from "ts-jest/utils";
jest.mock("../../apiCalls");

describe("TitlePage", () => {
  it("should render the Title Page", () => {
    const url = `title/The+Dark+Knight`;
    const toggleFavorite = jest.fn();
    const isFavorite = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <TitlePage
          url={url}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </BrowserRouter>
    );
  });

  it("should check that the right information is on the page", async () => {
    const url = `title/Pulp+Fiction`;
    const toggleFavorite = jest.fn();
    const isFavorite = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <TitlePage
          url={url}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </MemoryRouter>
    );
    debugger;
    //use smaller fetched data and mock the implementation to make sure it's showing up on the page correctly

    mocked(findTitleInfo).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(smallerfetchedData))
      )
    );
    // mocked(getWikiImage).mockImplementation((wUrl: string) =>
    //   Promise.resolve(
    //     "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg"
    //   )
    // );

    await waitFor(() => expect(getByText("Read more...")).toBeInTheDocument());
  });
});

//what unit tests am I missing? hmmm
//check that the title is on the page? Something like that?
//what mock data would I need for that?
//everything from fetched data, basically
//probably the only tests in here
