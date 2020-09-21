import React, { ReactElement } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

interface Props {
  searchTerm: (term: string) => void;
  clearResults: () => void;
}

const Header: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <header>
      <Link to="/" className="homepage-link">
        <section className="title-section">
          <button
            className="now-what-button"
            onClick={() => props.clearResults()}
          >
            <h1 className="now-what-text">Now What!?</h1>
          </button>
        </section>
      </Link>
      <section className="actions">
        <Link to="/favorites" className="navlink">
          <p className="favorites">FAVORITES</p>
        </Link>
      </section>
    </header>
  );
};

export default Header;
