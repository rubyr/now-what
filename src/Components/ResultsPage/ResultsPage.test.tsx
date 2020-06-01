import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultsPage from './ResultsPage';
import { MemoryRouter } from 'react-router-dom'
import { searchResult } from "../../types"

describe('ResultsPage', () => {

    it('should display some results', () => {
        const mockResult1: searchResult = {Name: "An American Tale: Fievel Goes West", Type: "movie", wTeaser: "Best Movie Ever", wUrl: "https://fievel.com", yUrl: "https://youtube.fievel.com", yID: "h3423kdf"}
        const mockResult2: searchResult = {Name: "An American Tale", Type: "movie", wTeaser: "Second Best Movie Ever", wUrl: "https://fievel-the-original.com", yUrl: "https://youtube.fievel-the-original.com", yID: "h34kdf"}
        const mockToggleFavorite = jest.fn()
        const { getByText } = render(<MemoryRouter><ResultsPage results={[mockResult1, mockResult2]} toggleFavorite={mockToggleFavorite} favorites={[]}/></MemoryRouter>)

        expect(getByText("An American Tale: Fievel Goes West")).toBeInTheDocument()
        expect(getByText("An American Tale")).toBeInTheDocument()
    })
})