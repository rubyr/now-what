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
import RelatedItem from "./RelatedItem";
jest.mock("../../apiCalls");

describe("RelatedItem", () => {
  it("should render the RelatedItem component", () => {
    const item = {
      Name: "The Dark Knight",
      Type: "movie",
      wTeaser: "string",
      wUrl: "string",
      yUrl: "string",
      yID: "string",
    };
    const { getByText } = render(
      <BrowserRouter>
        <RelatedItem {...item} />
      </BrowserRouter>
    );
    expect(getByText('The Dark Knight')).toBeInTheDocument();
  });

  //should I add a test to make sure that the image appears? 
});
