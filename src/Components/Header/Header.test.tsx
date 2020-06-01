import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom'

describe('Header', () => {
    it('should display the app\'s title', () => {
        const { getByText } = render(<MemoryRouter><Header /></MemoryRouter>)

        expect(getByText('Now What!?')).toBeInTheDocument()
    })

    it('should have a search input', () => {
        const { getByPlaceholderText } = render(<MemoryRouter><Header /></MemoryRouter>)

        expect(getByPlaceholderText('search...')).toBeInTheDocument()
    })

    it('should display the text as a user enters it', () => {
        
        const { getByDisplayValue, getByPlaceholderText } = render(<MemoryRouter><Header /></MemoryRouter>)

        fireEvent.change(getByPlaceholderText('search...'), { target: {value: 'Pee Wee\'s Big Adventure'}})

        expect(getByDisplayValue('Pee Wee\'s Big Adventure')).toBeInTheDocument()
    })

    // test for button/handleclick!
})