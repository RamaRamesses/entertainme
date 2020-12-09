import React from 'react';
import { Link } from 'react-router-dom';

export const Header : React.FC = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav" style={{fontFamily: 'Gugi, cursive', fontSize: '25px'}}>
            <li className="nav-item active">
                <Link to="/movies" className="nav-link text-white" href="#"> Movies <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
                <Link to="/tvseries" className="nav-link text-white" href="#"> TV Series </Link>
            </li>
            <li className="nav-item">
                <Link to="/favourites" className="nav-link text-white" href="#"> Favourites </Link>
            </li>
            </ul>
        </div>
      </nav>
    )
}