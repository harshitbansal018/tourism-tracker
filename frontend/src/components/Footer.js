import React from 'react';
import './Footer.css'; // Import the Footer CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Eco-Friendly Tourism. All rights reserved. Harshit Bansal 22bcs15323</p>
       
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
