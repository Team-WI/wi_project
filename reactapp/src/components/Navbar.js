// src/components/Navbar.js 
import { Link } from "react-router-dom";
import './Components.css'; 
import isLogin from "./PrivateRoute";
//import response from "../pages/SignIn";



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

const Navbar = ({ isLogin }) => {

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
};

export default Navbar;



// 테스트: 세션스토리지에 토큰이 남아있으면 로그인 된 상태, 상단 내비바 LogIn태그가 -> LogOut으로 변환
//{isLogin  ? (<Link to onClick={logoutToken}>로그아웃</Link>) : ( <Link onClick={() => navigate("/SignIn")}>로그인</Link>)}
//{isLogin ? (<Link to="/SignIn">로그아웃</Link>) : (<Link to="/SignIn">로그인</Link>)}



