import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import { fetchedData, favoritesData } from "./fetch-call-test";
import { findSimilar, fetchFavorites, findTitleInfo, getWikiImage } from "../../apiCalls";
import "@testing-library/jest-dom/extend-expect";
import { mocked } from "ts-jest/utils";
import { promises } from "dns";
jest.mock("../../apiCalls");

// const searchResults = mocked('../../apiCalls', true);

mocked(findSimilar).mockImplementation((term: string) =>
      Promise.resolve(new Response(JSON.stringify(fetchedData)))
    );
    mocked(fetchFavorites).mockImplementation((favorites: string[]) =>
      Promise.resolve(favoritesData)
    );
    mocked(getWikiImage).mockImplementation((title: string) => 
      Promise.resolve("https://www.coolsite.com/this/is/not/a/url.png")
    );
    mocked(findTitleInfo).mockImplementation((term: string) =>
      Promise.resolve(fetchedData)
    );

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

  it("should display search results if the search term isn't an empty string", async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText(/title/i), {
      target: { value: "pulp fiction" },
    });
    // is this firing the right
    fireEvent.click(getAllByText("Search")[1]);
    //make instance of response object
    //pass in data as its body
    //?
    // is this throwing an error because apicalls returns a promise but fetched data isn't a promise?
    await waitFor(() => expect(getByText("Fight Club")).toBeInTheDocument());
  });

  it('should allow a user to search from the header search input', async () => {
    const { getByText, getByPlaceholderText, getAllByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('search...'), {
      target: { value: "pulp fiction" },
    });
    const searchButtons = getAllByText("Search")
    fireEvent.click(searchButtons[0]);

    await waitFor(() => getByText('Pulp Fiction'))
    expect(getByText('Pulp Fiction')).toBeInTheDocument()
  })

  it('should allow a user to favorite an item', async () => {
    const { getByText, getByPlaceholderText, getAllByText, getAllByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Search for a title'), {
      target: { value: "pulp fiction" },
    });
    fireEvent.click(getAllByText("Search")[1]);

    await waitFor(() => getByText('Pulp Fiction'))
    expect(getByText('Pulp Fiction')).toBeInTheDocument()

    fireEvent.click(getAllByLabelText("favorite")[0])
    fireEvent.click(getByText("FAVORITES"))
    
    const pulp = await waitFor(() => getByText("Pulp Fiction"))  
    expect(pulp).toBeInTheDocument()
  })

  it('should show a user details for a given item when they click on it', async () => {
    const { getByText, getByPlaceholderText, getAllByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('Search for a title'), {
      target: { value: "pulp fiction" },
    });

    fireEvent.click(getAllByText("Search")[1]);

    const pf = await waitFor(() => getByText('Pulp Fiction'))
    expect(pf).toBeInTheDocument()
    
    fireEvent.click(getByText('Pulp Fiction'))

    const readMoreSignal = await waitFor(() => getByText('Read more...'))
    expect(readMoreSignal).toBeInTheDocument()

    await waitFor(() => getByText('Pulp Fiction'));

    expect(getByText(
      "Pulp Fiction is a 1994 American crime film written and directed by Quentin Tarantino, who conceived it with Roger Avary", 
      { exact: false })
    ).toBeInTheDocument()
  })


  //if search button is clicked and there is a search term, should find relevant search items
  //mock fetch call  - pull it out into a different file
  //maybe create test file of the similar {}
  //mocked fetch call should return the copied data (similar {})

  //if search button is clicked and there is a search term, should not find relevant search terms where none exist
});

