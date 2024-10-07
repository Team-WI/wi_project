/* src/components/Layout/NavBar.jsx

TODO: 
-로그인 전,후 상단 버튼 바뀌는 기능 - 조건부렌더링으로 태그 바꾸기. 세션스토리지
*/

import React, { useState } from 'react';
import { Link, useParams, useLocation} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { CATEGORIES, SUBCATEGORIES } from '../CATEGORIES';
import SearchBar from './SearchBar';
import '../Components.css';
import './NavBar.css'; 

const NavBar = ({ products }) => {
  const [expanded, setExpanded] = useState(false);
  const { category, item } = useParams()
  const location = useLocation();

  // console.log('Current category:', category); 

  // 상위 카테고리 클릭시 하위카테고리 네비게이션바 나타남
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const currentCategory = CATEGORIES.find(cat => cat.name === category);
  const categoryText = currentCategory ? currentCategory.text : category;
  
  return (
    <div>
    <Navbar bg="white" variant="light" expand="lg" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">WI Mall</Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="responsive-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
        
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

          <div className="d-flex align-items-center">
            <SearchBar products={products}/>

            <Nav>
              <Nav.Link as={Link} to="/MyLike" onClick={() => setExpanded(false)}>MyLike</Nav.Link>
              <Nav.Link as={Link} to="/MyPage" onClick={() => setExpanded(false)}>MyPage</Nav.Link>
              <Nav.Link as={Link} to="/ShoppingCart" onClick={() => setExpanded(false)}>Cart</Nav.Link>
              <Nav.Link as={Link} to="/SignIn" onClick={() => setExpanded(false)}>Login</Nav.Link>
            </Nav>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default NavBar;