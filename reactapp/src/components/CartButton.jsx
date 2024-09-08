/** CartButton.jsx
 * 상품 상세페이지 장바구니 담기 버튼
 */


import React from 'react';
import { useCart } from './CartContext';
import Button from 'react-bootstrap/Button';

const CartButton = ({ productId }) => {
  const { addToCart } = useCart();

  return (
    <Button className="cart-btn" variant="outline-dark" onClick={() => addToCart(productId)}>
      장바구니 담기
    </Button>
  );
};

export default CartButton;
