import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";

describe("FavoriteButton", () => {
  it("should render an image to the page", () => {
    const { getByLabelText } = render(
      <FavoriteButton toggleFavorite={() => {}} />
    );
    expect(getByLabelText(/favorite/gi)).toBeInTheDocument();
  });
  it("should toggle img src when clicked", () => {
    const { getByLabelText, getByAltText } = render(
      <FavoriteButton toggleFavorite={() => {}} />
    );
    const button = getByLabelText(/favorite/gi);
    const img = getByAltText(/favorite/gi) as HTMLImageElement;
    const startImg = img.src;
    fireEvent.click(button);
    expect(img.src).not.toEqual(startImg);
    fireEvent.click(button);
    expect(img.src).toEqual(startImg);
  });
  it("should call a toggleFavorite function when clicked", () => {
    const mockToggle = jest.fn();
    const { getByLabelText } = render(
      <FavoriteButton toggleFavorite={mockToggle} />
    );
    fireEvent.click(getByLabelText(/favorite/gi));
    expect(mockToggle).toHaveBeenCalled();
  });
});
