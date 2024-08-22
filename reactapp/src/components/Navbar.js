// src/components/Navbar.js 
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import '../assets/styles/NavBar.css'; 

const NavBar = ({ isLogin }) => {
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">WebInside</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Best</Nav.Link>
            <Nav.Link as={Link} to="/">Women</Nav.Link>
            <Nav.Link as={Link} to="/">Men</Nav.Link>
            <Nav.Link as={Link} to="/">Kids</Nav.Link>
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
            <Nav.Link as={Link} to="/MyLike">Like</Nav.Link>
            <Nav.Link as={Link} to="/MyPage">MyPage</Nav.Link>
            <Nav.Link as={Link} to="/ShoppingCart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/SignIn">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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



