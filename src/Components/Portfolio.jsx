// src/components/Portfolio.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';

const Portfolio = () => {
  const projects = [
    { id: 1, img: img1, title: 'Project 1' },
    { id: 2, img: img2, title: 'Project 2' },
    { id: 3, img: img3, title: 'Project 3' },
  ];

  return (
    <section id="portfolio" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Portfolio</h2>
        <Row>
          {projects.map((proj) => (
            <Col md={4} key={proj.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={proj.img} />
                <Card.Body>
                  <Card.Title>{proj.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Portfolio;
