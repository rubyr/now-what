import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('Header', () => {
    it('should display the app\'s title', () => {
        const { getByText } = render(<Header />)

        expect(getByText('Now What!?')).toBeInTheDocument()
    })

    it('should have a search input', () => {
        const { getByPlaceholderText } = render(<Header />)

        expect(getByPlaceholderText('search...')).toBeInTheDocument()
    })

    it('should display the text as a user enters it', () => {
        
        const { getByDisplayValue, getByPlaceholderText } = render(<Header />)

        fireEvent.change(getByPlaceholderText('search...'), { target: {value: 'Pee Wee\'s Big Adventure'}})

        expect(getByDisplayValue('Pee Wee\'s Big Adventure')).toBeInTheDocument()
    })

    // test for button/handleclick!
})