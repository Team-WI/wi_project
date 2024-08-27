// src/components/Navbar.js 
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import '../assets/styles/NavBar.css'; 

// const NavBar = ({ isLogin }) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <Navbar bg="dark" variant='dark' expand="lg" sticky="top">
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/">WebInside</Navbar.Brand>
//         <Navbar.Toggle 
//         aria-controls="responsive-navbar-nav" 
//         onClick={() => setExpanded(expanded ? false : "expanded")}
//         />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Best</Nav.Link>
//             <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Women</Nav.Link>
//             <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Men</Nav.Link>
//             <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Kids</Nav.Link>
//           </Nav>
//           <Form className="d-flex">
//             <InputGroup>  
//               <Form.Control
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="light">
//                 <span className="d-none d-lg-inline">검색</span>
//               </Button>
//             </InputGroup>
//           </Form>
//           <Nav>
//             <Nav.Link as={Link} to="/MyLike" onClick={() => setExpanded(false)}>Like</Nav.Link>
//             <Nav.Link as={Link} to="/MyPage" onClick={() => setExpanded(false)}>MyPage</Nav.Link>
//             <Nav.Link as={Link} to="/ShoppingCart" onClick={() => setExpanded(false)}>Cart</Nav.Link>
//             <Nav.Link as={Link} to="/SignIn" onClick={() => setExpanded(false)}>Login</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;


// 재영님's 로그인, 로그아웃 조건별 네비바
const Navbar = () => {
if (response) {
  return (
    <nav className="navbar">
    <div className="logo">
      <Link to="/">WI Mall</Link>
    </div>
    <ul className="nav-links">
      <li>
        <Link to="/MyLike">MyLike</Link>
      </li>
      <li>
        <Link to="/MyPage">MyPage</Link>
      </li>
      <li>
        <Link to="/ShoppingCart">ShoppingCart</Link>
      </li>
      <li>
      <Link to="/SignIn">LogIn</Link>
    </li>
    </ul>
  </nav>
  ); 
 
} else {
  return (
    <nav className="navbar">
    <div className="logo">
      <Link to="/">WI Mall</Link>
    </div>
    <ul className="nav-links">
      <li>
        <Link to="/MyLike">MyLike</Link>
      </li>
      <li>
        <Link to="/MyPage">MyPage</Link>
      </li>
      <li>
        <Link to="/ShoppingCart">ShoppingCart</Link>
      </li>
      <li>
      <Link to="/SignIn">LogOut</Link>
    </li>
    </ul>
  </nav>
  ); 
}
  
};

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



