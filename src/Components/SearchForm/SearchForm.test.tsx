import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  it("should render to the page without crashing", () => {
    render(<SearchForm searchTerm={() => {}} />);
  });

  it("should have a search input", () => {
    const { getByPlaceholderText } = render(
      <SearchForm searchTerm={() => {}} />
    );
    expect(getByPlaceholderText("ex: Frozen")).toBeInTheDocument();
  });

  it("should have a search button", () => {
    const { getByText } = render(<SearchForm searchTerm={() => {}} />);
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("should be able to take user input", () => {
    const { getByPlaceholderText } = render(
      <SearchForm searchTerm={() => {}} />
    );
    const input = getByPlaceholderText("ex: Frozen");
    fireEvent.change(input, { target: { value: "Blade Runner" } });
    expect(input).toHaveValue("Blade Runner");
  });

  it("should be able to search for a title", () => {
    const mockSearchTerm = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SearchForm searchTerm={mockSearchTerm} />
    );
    const input = getByPlaceholderText("ex: Frozen");
    const button = getByText("Search");
    fireEvent.change(input, { target: { value: "Blade Runner" } });
    fireEvent.click(button);
    expect(mockSearchTerm).toHaveBeenCalledWith("Blade Runner");
  });
  it("should do nothing if a user searches an empty string or nothing", () => {
    const mockSearchTerm = jest.fn();
    const { getByText } = render(<SearchForm searchTerm={mockSearchTerm} />);

    fireEvent.click(getByText("Search"));
    expect(mockSearchTerm).not.toHaveBeenCalled();
  });
});
