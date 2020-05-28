import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  it("should render to the page without crashing", () => {
    render(<SearchForm />);
  });
  it("should have a search input", () => {
    const { getByPlaceholderText } = render(<SearchForm />);
    expect(getByPlaceholderText(/title/i)).toBeInTheDocument();
  });
  it("should have a search button", () => {
    const { getByText } = render(<SearchForm />);
    expect(getByText(/search/i)).toBeInTheDocument();
  });
  it("should be able to take user input", () => {
    const { getByPlaceholderText } = render(<SearchForm />);
    const input = getByPlaceholderText(/title/i);
    fireEvent.change(input, { target: { value: "Blade Runner" } });
    expect(input).toHaveValue("Blade Runner");
  });
  it("should be able to search for a title", () => {
    const { getByPlaceholderText, getByText } = render(<SearchForm />);
    const input = getByPlaceholderText(/title/i);
    const button = getByText(/search/i);
    fireEvent.change(input, { target: { value: "Blade Runner" } });
    fireEvent.click(button);
    // TODO: expect a page change? or a fetch call at the very least
  });
});
