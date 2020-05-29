import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Result from './Result';
import { MemoryRouter } from 'react-router-dom'
import { searchResult } from "../../types"

describe('Result', () => {

    it('should display the result\'s name', () => {
        const mockData: searchResult = {Name: "An American Tale: Fievel Goes West", Type: "movie", wTeaser: "Best Movie Ever", wUrl: "https://fievel.com", yUrl: "https://youtube.fievel.com", yID: "h3423kdf"}

        const { getByText } = render(<MemoryRouter><Result data={mockData}/></MemoryRouter>)

        expect(getByText("An American Tale: Fievel Goes West")).toBeInTheDocument()
    })
})

