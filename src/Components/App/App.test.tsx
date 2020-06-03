import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import { fetchedData, smallerfetchedData } from "./fetch-call-test";
import { findSimilar, fetchFavorites, findTitleInfo } from "../../apiCalls";
import "@testing-library/jest-dom/extend-expect";
import { mocked } from "ts-jest/utils";
jest.mock("../../apiCalls");

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

  it("should display search results if the search term isn't an empty string", () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText(/title/i), {
      target: { value: "pulp fiction" },
    });
    fireEvent.click(getByPlaceholderText("Search for a title"));
    mocked(findSimilar).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData)))
    );
    waitFor(() => expect(getByText("Fight Club")).toBeInTheDocument());
  });

  it("should not display search results if the search term is an empty string", () => {
    const { getByText, getByPlaceholderText, getAllByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText(/title/i), {
      target: { value: "" },
    });
    const searchButtons = getAllByText("Search");
    fireEvent.click(searchButtons[1]);
    expect(() => getByText("Fight Club")).toThrow();
  });

  it("should allow a user to search from the header search input", async () => {
    const {
      getByText,
      getByPlaceholderText,
      getAllByText,
      getAllByLabelText,
    } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText("search..."), {
      target: { value: "pulp fiction" },
    });
    const searchButtons = getAllByText("Search");
    fireEvent.click(searchButtons[0]);

    mocked(findSimilar).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData)))
    );

    await waitFor(() => getByText("Pulp Fiction"));
    expect(getByText("Pulp Fiction")).toBeInTheDocument();
  });

  it.skip("should allow a user to favorite an item", async () => {
    const {
      getByText,
      getByPlaceholderText,
      getAllByText,
      getAllByLabelText,
    } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText("Search for a title"), {
      target: { value: "pulp fiction" },
    });
    fireEvent.click(getAllByText("Search")[1]);

    mocked(findSimilar).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData)))
    );

    await waitFor(() => getByText("Pulp Fiction"));
    expect(getByText("Pulp Fiction")).toBeInTheDocument();

    fireEvent.click(getAllByLabelText("favorite")[0]);
    fireEvent.click(getByText("FAVORITES"));

    mocked(fetchFavorites).mockImplementation((favorites: string[]) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData.Similar.Info)))
    );

    const pulpFiction = await waitFor(() => getByText("Pulp Fiction"));
    expect(pulpFiction).toBeInTheDocument();
  });

  it("should show a user details for a given item when they click on it", async () => {
    const {
      getByText,
      getByPlaceholderText,
      getAllByText,
      getByAltText,
      findByAltText,
    } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText("Search for a title"), {
      target: { value: "pulp fiction" },
    });
    fireEvent.click(getAllByText("Search")[1]);

    mocked(findSimilar).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData)))
    );

    await waitFor(() => expect(getByText("Pulp Fiction")).toBeInTheDocument());
    // expect(getByText("Pulp Fiction")).toBeInTheDocument();

    // goes bad here

    fireEvent.click(getByAltText("Pulp Fiction"));

    // everything above this is working the way it's supposed to
    mocked(findTitleInfo).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(smallerfetchedData)))
    );

    //!!mocked function above may be failing because there is another async call (getWikiImage) inside of the same function
    //!!so this function above may be working but we're actually missing a mocked image function

    // await waitFor(() => getByAltText("youtube-logo"));
    await waitFor(() =>
      expect(getByAltText("youtube-logo")).toBeInTheDocument()
    );
    // await waitFor(() =>
    //   expect(
    //     getByText(
    //       "Pulp Fiction is a 1994 American crime film written and directed by Quentin Tarantino, who conceived it with Roger Avary."
    //     )
    //   ).toBeInTheDocument()
    // );
  });
});
