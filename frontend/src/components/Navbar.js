import React, { useState } from 'react';
import './Navbar.css';
import LoginButton from './LoginButton';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h1>Eco-Friendly Tourism Tracker</h1>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#rewards">Rewards</a></li>
        <li><a href="#Community">Community</a></li>
        <li><LoginButton /></li>
      </ul>
    </nav>
  );
};

export default Navbar;
