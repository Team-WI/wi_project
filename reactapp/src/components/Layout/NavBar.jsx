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
import '../../assets/styles/NavBar.css'; 

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

  const categories = ['Best', 'Women', 'Men', 'Kids'];

  return (
    <div>
    <Navbar bg="white" variant="dark" expand="lg" expanded={expanded} sticky="top">
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
    {/* <Category /> */}
    </div>
  );
};

export default NavBar;

// const Navbar = () => {
// if (response) {
//   return (
//     <nav className="navbar">
//     <div className="logo">
//       <Link to="/">WI Mall</Link>
//     </div>
//     <ul className="nav-links">
//       <li>
//         <Link to="/MyLike">MyLike</Link>
//       </li>
//       <li>
//         <Link to="/MyPage">MyPage</Link>
//       </li>
//       <li>
//         <Link to="/ShoppingCart">ShoppingCart</Link>
//       </li>
//       <li>
//       <Link to="/SignIn">LogIn</Link>
//     </li>
//     </ul>
//   </nav>
//   ); 
 
// } else {
//   return (
//     <nav className="navbar">
//     <div className="logo">
//       <Link to="/">WI Mall</Link>
//     </div>
//     <ul className="nav-links">
//       <li>
//         <Link to="/MyLike">MyLike</Link>
//       </li>
//       <li>
//         <Link to="/MyPage">MyPage</Link>
//       </li>
//       <li>
//         <Link to="/ShoppingCart">ShoppingCart</Link>
//       </li>
//       <li>
//       <Link to="/SignIn">LogOut</Link>
//     </li>
//     </ul>
//   </nav>
//   ); 
// }
  
// };

// const Navbar = ({ isLogin }) => {

//   return (
//     <nav className="navbar">
//     <div className="logo">
//       <Link to="/">WI Mall</Link>
//     </div>
//     <ul className="nav-links">
//       <li>
//         <Link to="/MyLike">MyLike</Link>
//       </li>
//       <li>
//         <Link to="/MyPage">MyPage</Link>
//       </li>
//       <li>
//         <Link to="/ShoppingCart">ShoppingCart</Link>
//       </li>
//       <li>
//       <Link to="/SignIn">LogIn</Link>
//     </li>
//     </ul>
//   </nav>
//   );
// };

// export default Navbar;



// 테스트: 세션스토리지에 토큰이 남아있으면 로그인 된 상태, 상단 내비바 LogIn태그가 -> LogOut으로 변환
//{isLogin  ? (<Link to onClick={logoutToken}>로그아웃</Link>) : ( <Link onClick={() => navigate("/SignIn")}>로그인</Link>)}
//{isLogin ? (<Link to="/SignIn">로그아웃</Link>) : (<Link to="/SignIn">로그인</Link>)}



