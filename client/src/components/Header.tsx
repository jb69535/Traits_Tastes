// Header.tsx
// Author: Jun Beom
import React, { useState } from "react";
import "../style/components/header.css";
import FontLogo from "../assets/FontLgoBGRemove.svg";
import { Link } from "react-router-dom";

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
