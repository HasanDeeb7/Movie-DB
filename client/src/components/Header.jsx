import React from "react";
import Logo from '../assets/Logo.svg'
import { Link } from "react-router-dom";
import "../style/Header.css"
function Header(props) {
  return (
    <header>
      <div className="head-wrapper">
        <figure>
          <Link to='/'>
          <img src={Logo} alt="Logo" />
          </Link>

        </figure>
        <nav>
          <ul className="nav-links">
            <li className="list-item"><Link to='/' className="link">Home</Link></li>
            <li className="list-item"><Link to='/user' className="link">Watch List</Link></li>
            <li className="list-item"><Link to='/error' className="link"> About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
