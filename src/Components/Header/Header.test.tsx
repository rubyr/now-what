import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom'

describe('Header', () => {
    it('should display the app\'s title', () => {
        const { getByText } = render(<MemoryRouter><Header searchTerm={() => {}} clearResults={() => {}}/></MemoryRouter>)

        expect(getByText('Now What!?')).toBeInTheDocument()
    })

    it('should have a search input', () => {
        const { getByPlaceholderText } = render(<MemoryRouter><Header searchTerm={() => {}}/></MemoryRouter>)

        expect(getByPlaceholderText('search...')).toBeInTheDocument()
    })

    it('should display the text as a user enters it', () => {
        
        const { getByDisplayValue, getByPlaceholderText } = render(<MemoryRouter><Header searchTerm={() => {}}/></MemoryRouter>)

        fireEvent.change(getByPlaceholderText('search...'), { target: {value: 'Pee Wee\'s Big Adventure'}})

        expect(getByDisplayValue('Pee Wee\'s Big Adventure')).toBeInTheDocument()
    })

    it('should call the searchTerm method with the search input when search button is clicked', () => {
        const mockSearchTerm = jest.fn()
        const { getAllByText, getByPlaceholderText } = render(<MemoryRouter><Header searchTerm={mockSearchTerm} clearResults={() => {}}/></MemoryRouter>)

        fireEvent.change(getByPlaceholderText('search...'), { target: {value: 'Pee Wee\'s Big Adventure'}})

        const searches = getAllByText('Search')
        const headerSearchButton = searches[0]
        fireEvent.click(headerSearchButton)
        expect(mockSearchTerm).toHaveBeenCalledWith('Pee Wee\'s Big Adventure')



    })
})