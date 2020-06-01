import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FavoritesList from "./FavoritesList";
import { MemoryRouter } from "react-router-dom";
import { getWikiImage, fetchFavorites } from "../../apiCalls";
import { mocked } from "ts-jest/utils";
import { mockFavoriteData } from "./mockData";
jest.mock("../../apiCalls");

describe("ResultsPage", () => {
  // ??? not sure how to go from string to displaying data...mock the fetch i guess?

  it("should display the favorites", () => {
    const mockFavorite1: string = "An American Tale: Fievel Goes West";
    const mockFavorite2: string = "An American Tale";
    const mockToggleFavorite = jest.fn();

    mocked(fetchFavorites).mockImplementation(
      (favorites: string[]) => mockFavoriteData as any
    );
    mocked(getWikiImage).mockImplementation((title: string) =>
      Promise.resolve("cool")
    );

    const { getByText } = render(
      <MemoryRouter>
        <FavoritesList
          toggleFavorite={mockToggleFavorite}
          favorites={[mockFavorite1, mockFavorite2]}
        />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(
        getByText("An American Tale: Fievel Goes West")
      ).toBeInTheDocument();
      expect(getByText("An American Tale")).toBeInTheDocument();
    });
  });
  it("should let the user know if there are no favorites", () => {
    const mockToggleFavorite = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <FavoritesList toggleFavorite={mockToggleFavorite} favorites={[]} />
      </MemoryRouter>
    );

    expect(
      getByText("Nothing favorited yet. Add some to see them here!")
    ).toBeInTheDocument();
  });
});
