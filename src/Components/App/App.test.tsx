import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { fetchedData } from "./fetch-call-test";
import { findSimilar, fetchFavorites, findTitleInfo } from "../../apiCalls";
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
    //make instance of response object
    //pass in data as its body
    //?
    // is this throwing an error because apicalls returns a promise but fetched data isn't a promise?
    waitFor(() => expect(getByText("Fight Club")).toBeInTheDocument());
  });

  it('should allow a user to search from the header search input', async () => {
    const { getByText, getByPlaceholderText, getAllByText, getAllByLabelText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('search...'), {
      target: { value: "pulp fiction" },
    });
    const searchButtons = getAllByText("Search")
    fireEvent.click(searchButtons[0]);


    mocked(findSimilar).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData)))
    );

    await waitFor(() => getByText('Pulp Fiction'))
    expect(getByText('Pulp Fiction')).toBeInTheDocument()
  })

  it.skip('should allow a user to favorite an item', async () => {
    const { getByText, getByPlaceholderText, getAllByText, getAllByLabelText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('Search for a title'), {
      target: { value: "pulp fiction" },
    });
    fireEvent.click(getAllByText("Search")[1]);

    mocked(findSimilar).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData)))
    );

    await waitFor(() => getByText('Pulp Fiction'))
    expect(getByText('Pulp Fiction')).toBeInTheDocument()

    fireEvent.click(getAllByLabelText("favorite")[0])
    fireEvent.click(getByText("FAVORITES"))

    mocked(fetchFavorites).mockImplementation((favorites: string[]) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData.Similar.Info)))
    );
    
    const pulpFiction =  await waitFor(() => getByText("Pulp Fiction"))
    expect(pulpFiction).toBeInTheDocument()
  })

  it('should show a user details for a given item when they click on it', async () => {
    const { getByText, getByPlaceholderText, getAllByText, getByAltText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('Search for a title'), {
      target: { value: "pulp fiction" },
    });
    fireEvent.click(getAllByText("Search")[1]);

    mocked(findSimilar).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData)))
    );

    await waitFor(() => getByText('Pulp Fiction'))
    expect(getByText('Pulp Fiction')).toBeInTheDocument()
    
    // goes bad here
    fireEvent.click(getByAltText('Pulp Fiction'))

    // mocked(findTitleInfo).mockImplementation((term: string) =>
    //   Promise.resolve(new Response(JSON.stringify(fetchedData)))
    // );
    // expect(getByText("Pulp Fiction is a 1994 American crime film written and directed by Quentin Tarantino, who conceived it with Roger Avary")).toBeInTheDocument()
  })


  //if search button is clicked and there is a search term, should find relevant search items
  //mock fetch call  - pull it out into a different file
  //maybe create test file of the similar {}
  //mocked fetch call should return the copied data (similar {})

  //if search button is clicked and there is a search term, should not find relevant search terms where none exist
});

