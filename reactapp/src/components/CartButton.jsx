/** CartButton.jsx
 * 상품 상세페이지 장바구니 담기 버튼
 */


import React from 'react';
import { useCart } from './CartContext';

const CartButton = ({ productId }) => {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(productId)}>
      장바구니 담기
    </button>
  );
};

export default CartButton;
