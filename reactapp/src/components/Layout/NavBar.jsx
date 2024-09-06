/* src/components/Layout/NavBar.jsx

TODO: 
-로그인 전,후 상단 버튼 바뀌는 기능 - 조건부렌더링으로 태그 바꾸기. 세션스토리지
*/

import React, { useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Form, Button, InputGroup } from 'react-bootstrap';
=======
import { Link, useParams, useLocation} from 'react-router-dom';
import { Container, Nav, Navbar, Form, Button, InputGroup } from 'react-bootstrap';
import { CATEGORIES, SUBCATEGORIES } from '../CATEGORIES';
>>>>>>> origin/jykim
import '../Components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css'; 

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
<<<<<<< HEAD

  const categories = ['Best', 'Women', 'Men', 'Kids'];

=======
  const { category, item } = useParams()
  const location = useLocation();

  // console.log('Current category:', category); 

  // 상위 카테고리 클릭시 하위카테고리 네비게이션바 나타남
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const currentCategory = CATEGORIES.find(cat => cat.name === category);
  const categoryText = currentCategory ? currentCategory.text : category;
  
>>>>>>> origin/jykim
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
        
<<<<<<< HEAD
          <Nav className="me-auto">

            
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Best</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Women</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Men</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Kids</Nav.Link>


          </Nav>
=======
        <Nav className="me-auto">
              {CATEGORIES.map((cat) => (
                <Nav.Link 
                  key={cat.name}
                  as={Link} 
                  to={`/categories/${cat.name}`}
                  active={isActive(`/categories/${cat.name}`)}
                  onClick={() => setExpanded(false)}
                >
                  {cat.text}
                </Nav.Link>
              ))}
            </Nav>
          
>>>>>>> origin/jykim

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
<<<<<<< HEAD
=======
          
>>>>>>> origin/jykim
          <Nav>
            <Nav.Link as={Link} to="/MyLike" onClick={() => setExpanded(false)}>MyLike</Nav.Link>
            <Nav.Link as={Link} to="/MyPage" onClick={() => setExpanded(false)}>MyPage</Nav.Link>
            <Nav.Link as={Link} to="/ShoppingCart" onClick={() => setExpanded(false)}>Cart</Nav.Link>
            <Nav.Link as={Link} to="/SignIn" onClick={() => setExpanded(false)}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
<<<<<<< HEAD
=======

{/* 
    {category && (
        <Navbar>
          <Nav className="justify-content-center">
            {SUBCATEGORIES.map((subcat) => (
              <Nav.Item key={subcat.name}>
                <Nav.Link 
                  as={Link} 
                  to={`/categories/${category}/${subcat.name}`}
                  active={item === subcat.name}
                >
                  {subcat.text}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar>
    )} */}
>>>>>>> origin/jykim
    </div>
  );
};

export default NavBar;