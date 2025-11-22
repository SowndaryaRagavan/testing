// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, animateScroll as scroll } from "react-scroll";
import logo from "../assets/images/logo3.png";

const menuItems = [
  { label: "Home", to: "hero" },
  { label: "About", to: "about" },
  { label: "Portfolio", to: "portfolio" },
  { label: "Experiences", to: "services" },
  { label: "Certifications", to: "contact" },
  { label: "TypeScript Demo", to: "typescript-demo", external: true },
];

const Header = () => {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
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
            {menuItems.map((item) =>
    item.external ? (
      <Nav.Link
        key={item.to}
        href="/typescript-demo"
        className={`nav-link ${menuOpen ? "slide-in" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        {item.label}
      </Nav.Link>
    ) : (
      <Link
        key={item.to}
        to={item.to}
        smooth={true}
        duration={600}
        spy={true}
        offset={-80}
        activeClass="active-link"
        className={`nav-link ${menuOpen ? "slide-in" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        {item.label}
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
