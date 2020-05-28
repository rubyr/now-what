import React, { useState, ReactElement } from 'react'

import './Header.css'

interface Props {}

const Header = (props: Props): ReactElement => {

    const [ searchInput, updateSearchInput ] = useState("")

    const handleClick = (): void => {
        console.log(searchInput)
        clearSearch()
    }

    const clearSearch = (): void => {
        updateSearchInput('')
    }
// if not doing SPA, maybe conditional render search bar when not at home screen?

    return (
        <header>
            <section className="title-section">
                <h1>Now What!?</h1>
            </section>
            <input 
                type="text"
                name="search"
                placeholder="search..."
                className="header-search"
                value={searchInput}
                onChange={e => updateSearchInput(e.target.value) }
            />
            <button className="header-search-button" onClick={handleClick}>Search</button> 
        </header>
    )
}

export default Header