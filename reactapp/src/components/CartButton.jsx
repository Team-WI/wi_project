/** CartButton.jsx
 * 상품 상세페이지 장바구니 담기 버튼 컴포넌트. 
 * useCart 훅을 사용하여 장바구니 담기 관련 기능 사용.
 * 함수이름: addToCart
 */


import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap';

const CartButton = ({ productId, quantity }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(productId, quantity);
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      // [ ] 오류 메시지 표시
      setToastMessage('장바구니 추가에 실패했습니다. 다시 시도해주세요.');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
    }
    
  return (
    <div>
      <Button className="cart-btn" variant="outline-dark" onClick={handleAddToCart}>
        장바구니 담기
      </Button>

      {/* <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body>상품이 장바구니에 추가되었습니다.</Toast.Body>
      </Toast> */}
    </div>
  );
};

export default CartButton;
