import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import TitlePage from "./TitlePage";
import { act } from "react-dom/test-utils";
import { smallerfetchedData } from "../App/fetch-call-test";
import { findTitleInfo, getWikiImage } from "../../apiCalls";
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
    mocked(getWikiImage).mockImplementation((wUrl: string) =>
      Promise.resolve(
        "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg"
      )
    );
    mocked(findTitleInfo).mockImplementation((term: string) =>
      Promise.resolve(smallerfetchedData)
    );

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

    await waitFor(() => expect(getByText("Read more...")).toBeInTheDocument());
  });
});
