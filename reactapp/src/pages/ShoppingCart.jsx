/** src/pages/ShoppingCart.jsx
 * 
 *  */ 

import React, { useState} from "react";
import CartItem from "../components/CartItem";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      checked: true,
      image: "https://placehold.co/100x100",
      brand: "젤로",
      name: "짱구 블루투스 바티컬 마우스",
      option: "옵션 : [제품선택]짱구 바티컬 마우스",
      quantity: 1,
      originalPrice: 59900,
      price: 39900
    },
    {
      id: 2,
      checked: true,
      image: "https://placehold.co/100x100",
      brand: "아티드",
      name: "옐로 슬럽 반팔 티셔츠_MELANGE WHITE",
      option: "옵션 : [COLOR:SIZE]MELANGE WHITE:F",
      quantity: 1,
      originalPrice: 59000,
      price: 41300
    },
    {
      id: 3,
      checked: true,
      image: "https://placehold.co/100x100",
      brand: "아티드",
      name: "모헤어 라운드넥 니트_PURPLE",
      option: "옵션 : [COLOR:SIZE]PURPLE:F",
      quantity: 1,
      originalPrice: 169000,
      price: 152100
    }
  ]);

  return (
    <div className="shopping-cart">
      <h2>장바구니</h2>
      <div className="cart-header">
        <input 
        // type="checkbox" 
        // checked={cartItems.every(item => item.checked)} 
        // onChange={() => {}} 
        />
        <span>상품 정보</span>
        <span>수량</span>
        <span>주문금액</span>
        <span>배송비</span>
      </div>
      {cartItems.map(item => (
        <CartItem 
          key={item.id} 
          item={item} 
          // onQuantityChange={handleQuantityChange}
          // onRemove={handleRemove}
        />
      ))}
      <div className="cart-total">
        <span>총 주문 금액</span>
        {/* <span>{totalPrice.toLocaleString()}원</span> */}
      </div>
      <button className="order-button">주문하기</button>
    </div>
  );
};

export default ShoppingCart;
