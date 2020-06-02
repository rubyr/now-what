import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FavoritesDisplay from './FavoritesDisplay';
import { MemoryRouter } from 'react-router-dom'
import { searchResult } from "../../types"

describe('ResultsPage', () => {
    it('should display the heading Favorites', () => {
        const { getByText } = render(<MemoryRouter><FavoritesDisplay results={[]} toggleFavorite={()=> {}} favorites={[]}/></MemoryRouter>)
        expect(getByText("Favorites")).toBeInTheDocument()
    })

    it('should display some results', () => {
        const mockResult1: searchResult = {Name: "An American Tale: Fievel Goes West", Type: "movie", wTeaser: "Best Movie Ever", wUrl: "https://fievel.com", yUrl: "https://youtube.fievel.com", yID: "h3423kdf"}
        const mockResult2: searchResult = {Name: "An American Tale", Type: "movie", wTeaser: "Second Best Movie Ever", wUrl: "https://fievel-the-original.com", yUrl: "https://youtube.fievel-the-original.com", yID: "h34kdf"}
        const { getByText } = render(<MemoryRouter><FavoritesDisplay results={[mockResult1, mockResult2]} toggleFavorite={()=> {}} favorites={[]}/></MemoryRouter>)

        expect(getByText("An American Tale: Fievel Goes West")).toBeInTheDocument()
        expect(getByText("An American Tale")).toBeInTheDocument()
    })

    it('should display results by type', () => {
        const mockResult1: searchResult = {Name: "An American Tale: Fievel Goes West", Type: "movie", wTeaser: "Best Movie Ever", wUrl: "https://fievel.com", yUrl: "https://youtube.fievel.com", yID: "h3423kdf"}
        const mockResult2: searchResult = {Name: "The Winter of Our Discontent", Type: "book", wTeaser: "Good read", wUrl: "https://discontent.com", yUrl: "https://youtube.discontent.com", yID: "h34134fu"}
        const { getByText } = render(<MemoryRouter><FavoritesDisplay results={[mockResult1, mockResult2]} toggleFavorite={() => {}} favorites={[]}/></MemoryRouter>)

        expect(getByText("Movies")).toBeInTheDocument()
        expect(getByText("Books")).toBeInTheDocument()

    })
})