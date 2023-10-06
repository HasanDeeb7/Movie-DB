import React from "react";
import Logo from '../assets/Logo.svg'
import { Link } from "react-router-dom";
function Header(props) {
  return (
    <header>
      <div className="head-wrapper">
        <figure>
          <img src={Logo} alt="Logo" />
        </figure>
        <nav>
          <ul className="nav-links">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/user'>My Profle</Link></li>
            <li>Series</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
