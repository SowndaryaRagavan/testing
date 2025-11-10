// src/components/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="py-4 bg-dark text-white">
      <Container className="text-center">
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Sowndarya. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
