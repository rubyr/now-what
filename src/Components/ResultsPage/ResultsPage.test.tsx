import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';
import ResultsPage from './ResultsPage';
import { MemoryRouter } from 'react-router-dom'

describe('ResultsPage', () => {
    
    
    interface Result {
        Name: string
        Type: string
        wTeaser: string
        wUrl: string
        yUrl: string
        yID: string
    }
    it('should display some results', () => {
        const mockResult1: Result = {Name: "An American Tale: Fievel Goes West", Type: "movie", wTeaser: "Best Movie Ever", wUrl: "https://fievel.com", yUrl: "https://youtube.fievel.com", yID: "h3423kdf"}
        const mockResult2: Result = {Name: "An American Tale", Type: "movie", wTeaser: "Second Best Movie Ever", wUrl: "https://fievel-the-original.com", yUrl: "https://youtube.fievel-the-original.com", yID: "h34kdf"}

        const { getByText } = render(<MemoryRouter><ResultsPage results={[mockResult1, mockResult2]}/></MemoryRouter>)

        expect(getByText("An American Tale: Fievel Goes West")).toBeInTheDocument()
        expect(getByText("An American Tale")).toBeInTheDocument()
    })
})