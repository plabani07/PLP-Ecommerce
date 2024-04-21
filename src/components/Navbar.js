// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="my-bag-button" ><Link to="/">Home</Link></li>
      </ul>
      <Link to="/mybag" className="my-bag-button">
        <FontAwesomeIcon icon={faShoppingBag} />
      </Link>
    </nav>
  );
}

export default Navbar;
