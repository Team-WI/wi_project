/** cartContext.js
 * React의 ContextAPI를 이용한 장바구니 관련 CartProvider 
 * 함수 이름: addToCart
 * 동일한 productId가 장바구니에 존재하지 않으면 cartItems에 추가
 * 이미 존재하는 productId면 수량을 하나 더 추가
 * 
 */


import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (productId) => {
    // 동일한 productId가 장바구니에 존재하지 않으면 cartItems에 추가
    if (
      cartItems.filter((product) => {
        return product.productId === productId;
      }).length !== 0
    ) {
      setCartItems (
        cartItems.map((product) => {
          // 이미 존재하는 productId면 수량을 하나 더 추가
          if (product.productId === productId) {
            product.quantity += 1;
          }
          return product;
        })
      );
    } else {
      setCartItems([...cartItems, {productId:productId, quantity:1}])
    }

  };

  return (
      <CartContext.Provider value={{ cartItems, addToCart }}>
        {children}
      </CartContext.Provider>
      );
    };
    

export const useCart = () => useContext(CartContext);
