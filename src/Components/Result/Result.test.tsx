import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Result from './Result';
import { MemoryRouter } from 'react-router-dom'


describe('Result', () => {

    interface Result {
        Name: string
        Type: string
        wTeaser: string
        wUrl: string
        yUrl: string
        yID: string
    }

    it('should display the result\'s name', () => {
        const mockData: Result = {Name: "An American Tale: Fievel Goes West", Type: "movie", wTeaser: "Best Movie Ever", wUrl: "https://fievel.com", yUrl: "https://youtube.fievel.com", yID: "h3423kdf"}

        const { getByText } = render(<MemoryRouter><Result data={mockData}/></MemoryRouter>)

        expect(getByText("An American Tale: Fievel Goes West")).toBeInTheDocument()
    })
})

