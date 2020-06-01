import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Result from "./Result";
import { MemoryRouter } from "react-router-dom";
import { searchResult } from "../../types";
import { getWikiImage } from "../../apiCalls";
import { mocked } from "ts-jest/utils";
jest.mock("../../apiCalls.ts");

describe("Result", () => {
  it("should display the result's name", () => {
    const mockData: searchResult = {
      Name: "An American Tale: Fievel Goes West",
      Type: "movie",
      wTeaser: "Best Movie Ever",
      wUrl: "https://fievel.com",
      yUrl: "https://youtube.fievel.com",
      yID: "h3423kdf",
    };

    mocked(getWikiImage).mockImplementation(() =>
      Promise.resolve("https://www.notarealsite.com/abc.png")
    );

    const { getByText } = render(
      <MemoryRouter>
        <Result
          data={mockData}
          toggleFavorite={() => {}}
          favorite={false}
          type="what even goes here honestly"
        />
      </MemoryRouter>
    );
    waitFor(() =>
      expect(
        getByText("An American Tale: Fievel Goes West")
      ).toBeInTheDocument()
    );
  });
});
