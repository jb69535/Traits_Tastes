// Header.tsx
// Author: Jun Beom

import React, { useState } from "react";
import "../style/components/header.css";
import FontLogo from "../assets/FontLgoBGRemove.svg";
import { Link } from "react-router-dom";


/**
 * Navigation header component with responsive menu options.
 * 
 * @remarks
 * This component includes a navigation bar with links to different sections of the application. It supports smooth scrolling to sections and a toggleable menu for smaller screens.
 * 
 * @property isOpen - State to track if the mobile navigation menu is open.
 * @method toggleMenu - Toggles the visibility of the mobile navigation menu.
 * @method scrollToSection - Scrolls to the specified page section smoothly when a menu item is clicked.
 */
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <header>
        <div className="headerContainer">
          <Link to="/">
            <div className="logo">
              <img src={FontLogo} alt="logo" />
            </div>
          </Link>
          <ul className={`navbar__menu ${isOpen ? "open" : ""}`}>
            <li
              className="navbar__menu__item"
              onClick={() => scrollToSection("#home")}
            >
              Home
            </li>
            <li
              className="navbar__menu__item"
              onClick={() => scrollToSection("#search")}
            >
              Search
            </li>
            <li
              className="navbar__menu__item"
              onClick={() => scrollToSection("#rankings")}
            >
              Rankings
            </li>
            <li
              className="navbar__menu__item"
              onClick={() => scrollToSection("#about")}
            >
              About
            </li>
            <li
              className="navbar__menu__item"
              onClick={() => scrollToSection("#contact")}
            >
              Contact
            </li>
            <li className="navbar__menu__item">
              <Link className="mbti" to="/personality-test">
                MBTI
              </Link>
            </li>
          </ul>
          {/* <!-- Toggle Button --> */}
          <button className="navbar__toggle-btn" onClick={toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
