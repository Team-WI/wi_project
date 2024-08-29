/* src/components/Layout/NavBar.jsx

TODO: 
-로그인 전,후 상단 버튼 바뀌는 기능 - 조건부렌더링으로 태그 바꾸기. 세션스토리지
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Form, Button, InputGroup } from 'react-bootstrap';
import '../Components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css'; 

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

  const categories = ['Best', 'Women', 'Men', 'Kids'];

  return (
    <div>
    <Navbar bg="white" variant="light" expand="lg" expanded={expanded} sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">WI Mall</Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="responsive-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
        
          <Nav className="me-auto">

            
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Best</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Women</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Men</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Kids</Nav.Link>


          </Nav>

          <Form className="d-flex">
            <InputGroup>  
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button variant="light">
              <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
              </Button>
            </InputGroup>
          </Form>
          <Nav>
            <Nav.Link as={Link} to="/MyLike" onClick={() => setExpanded(false)}>MyLike</Nav.Link>
            <Nav.Link as={Link} to="/MyPage" onClick={() => setExpanded(false)}>MyPage</Nav.Link>
            <Nav.Link as={Link} to="/ShoppingCart" onClick={() => setExpanded(false)}>Cart</Nav.Link>
            <Nav.Link as={Link} to="/SignIn" onClick={() => setExpanded(false)}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default NavBar;