/** src/pages/ShoppingCart.jsx
 * 장바구니 페이지 레이아웃 컴포넌트
 * 사이드바 컴포넌트, 실제 장바구니에 담은 상품 데이터가 호출되는 CartItem.jsx 컴포넌트를 import
 *  */ 

import React, { useState} from "react";
import Sidebar from "../components/Sidebar";
import CartItem from "../components/CartItem";
import { Link } from 'react-router-dom';

const fakeItems = [
  {
    id: 1,
    checked: true,
    image: "https://placehold.co/100x100",
    seller: "젤로",
    name: "짱구 블루투스 바티컬 마우스",
    option: "옵션 : [제품선택]짱구 바티컬 마우스",
    quantity: 1,
    price: 39900
  },
  {
    id: 2,
    checked: true,
    image: "https://placehold.co/100x100",
    seller: "아티드",
    name: "옐로 슬럽 반팔 티셔츠_MELANGE WHITE",
    option: "옵션 : [COLOR:SIZE]MELANGE WHITE:F",
    quantity: 1,
    price: 41300
  },
  {
    id: 3,
    checked: true,
    image: "https://placehold.co/100x100",
    seller: "아티드",
    name: "모헤어 라운드넥 니트_PURPLE",
    option: "옵션 : [COLOR:SIZE]PURPLE:F",
    quantity: 1,
    price: 152100
  }
]


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(fakeItems);

  // 수량 변경 함수
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: Math.max(1, newQuantity)} : item ))
  }

  //장바구니 삭제 함수
  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  // 총 주문 금액 함수 
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="shopping-cart">
      {/* <Sidebar /> */}
      <h2 className="cart-title">장바구니</h2>
      {cartItems.length === 0 ? (
                <div className="empty-cart">
                        <hr />
                <h4>장바구니에 담은 상품이 없습니다.</h4>
                <Link to="/" className="continue-shopping-btn">계속 쇼핑하기</Link>
              </div>
      ) : (
        <>      
      <div className="cart-header">
        <div className="checkbox-column">
          <input 
          type="checkbox" 
          checked={cartItems.every(item => item.checked)} 
          onChange={() => {}} 
          />
        </div>

        <span className="item-info-header">상품 정보</span>
        <span>수량</span>
        <span>주문금액</span>
        <span>배송비</span>
        <span></span>
      </div>
      {cartItems.map(item => (
        <CartItem 
          key={item.id} 
          item={item} 
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      ))}
      <div className="cart-footer">
        <div className="cart-total">
          <span className="m-2">총 주문 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="cart-actions">
          <Link to="/" className="continue-button">계속 쇼핑하기</Link>
          <button className="order-button">주문하기</button>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default ShoppingCart;
