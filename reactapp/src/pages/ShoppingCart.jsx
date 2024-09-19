/** src/pages/ShoppingCart.jsx
 * 장바구니 페이지 레이아웃 컴포넌트
 * useCart 훅을 통해 장바구니 데이터를 호출
 * 사이드바 컴포넌트, 실제 장바구니에 담은 상품 데이터가 호출되는 CartItem.jsx 컴포넌트를 import
 *  */ 

import React from "react";
import { useCart } from "../hooks/useCart";
import Sidebar from "../components/Sidebar";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  
  // useCart 훅 사용
  const {
    cartItems,
    isLoading,
    error,
    updateQuantity,
    removeFromCart,
    totalPrice,
    toggleItemCheck,
    toggleAllCheck
  } = useCart();

  // 체크박스 선택된 상품 총 주문금액 계산
  const checkedItemsTotal = cartItems
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleToggleAll = (checked) => {
    toggleAllCheck(checked);
  };


  if (isLoading) return <LoaderCircle />;
  if (error) return <div>{error}</div>;

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
          onChange={(e) => handleToggleAll(e.target.checked)} 
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
          key={item.ShoppingCartId} 
          item={item} 
          onQuantityChange={updateQuantity}
          onRemove={removeFromCart}
          onToggleCheck={toggleItemCheck}
        />
      ))}
      <div className="cart-footer">
        <div className="cart-total">
          <span className="m-2">총 주문 금액</span>
          <span>{checkedItemsTotal.toLocaleString()}원</span>
        </div>
        <div className="cart-actions">
          <Link 
            to="/" 
            className="continue-button">계속 쇼핑하기</Link>
          <button 
            onClick={() => navigate("/Checkout")} 
            className="order-button"
            disabled={checkedItemsTotal === 0}
          >
            주문하기
          </button>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default ShoppingCart;
