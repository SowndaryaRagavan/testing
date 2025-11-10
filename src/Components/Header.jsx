// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, animateScroll as scroll } from "react-scroll";
import logo from "../assets/images/logo3.png";

const Header = () => {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`custom-navbar ${navbarScrolled ? "scrolled" : ""}`}
      expanded={menuOpen}
    >
      <Container>
        <Navbar.Brand
          href="#"
          onClick={() => {
            scroll.scrollToTop({ duration: 500 });
            setMenuOpen(false);
          }}
        >
         <img src={logo} alt="Sowndarya Logo" className="logo-img" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setMenuOpen(!menuOpen)}
          className="custom-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {["home", "about", "portfolio", "experiences", "certifications"].map(
              (section) => (
                <Link
                  key={section}
                  to={section}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                  activeClass="active-link"
                  className={`nav-link ${menuOpen ? "slide-in" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
