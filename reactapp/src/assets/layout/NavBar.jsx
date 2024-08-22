import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import '../assets/styles/NavBar.css'; 

const NavBar = ({ isLogin }) => {
  return (
    <div>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Container >
          <Navbar.Brand as={Link} to="/">WebInside</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link  as={Link} to="/">Best</Nav.Link>
              <Nav.Link  as={Link} to="/">Women</Nav.Link>
              <Nav.Link  as={Link} to="/">Men</Nav.Link>
              <Nav.Link  as={Link} to="/">Kids</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light">검색</Button>
            </Form>
            <Nav>
              <Nav.Link  as={Link} to="/MyLike">Like</Nav.Link>
              <Nav.Link  as={Link} to="/MyPage">MyPage</Nav.Link>
              <Nav.Link  as={Link} to="/ShoppingCart">Cart</Nav.Link>
              <Nav.Link  as={Link} to="/SignIn">Login</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;