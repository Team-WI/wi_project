/** Checkout.jsx
 * 결제 페이지. 초기 100,000원 포인트에서 결제 금액만큼 포인트가 차감되는 방식으로 가상 결제 페이지 구현 
 */

import React, { useState } from 'react';
import { useCheckout } from '../hooks/useCheckout';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userPoints, setUserPoints] = useState(100000);  // 초기 포인트(임시)

  const {
    checkoutItems,
    isLoading,
    error,
    processCheckout
  } = useCheckout();

  const buyNowMode = location.state?.buyNow;
  const buyNowProduct = location.state?.product;

  const itemsToCheckout = buyNowMode ? [buyNowProduct] : checkoutItems.filter(item => item.checked);
  const totalPrice = itemsToCheckout.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) return <LoaderCircle />;
  if (error) return <div>{error}</div>

  const handleCheckout = () => {
    if (userPoints >= totalPrice) {
      processCheckout(totalPrice);
      setUserPoints(prevPoints => prevPoints - totalPrice);
      alert("결제가 완료되었습니다.");
      navigate("/");    // 결제 내역 페이지로 이동
    } else {
      alert("포인트가 부족합니다.");
    }
  };

  return (
    <div className="checkout">
      <h2 className="checkout-title">결제</h2>
      <div className="checkout-items">
        {itemsToCheckout.map((item, index) => (
          <div key={buyNowMode ? index : item.shoppingCartId} className="checkout-item">
          <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>수량: {item.quantity}</p>
              <p>가격: {item.price.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <p>사용 가능한 포인트: {userPoints.toLocaleString()}원</p>
        <p className='total-price'>결제 금액: {totalPrice.toLocaleString()}원</p>
      </div>
      <div className='button-group'>
        <button className='button cancel-button' onClick={() => navigate(-2)}>취소</button>
      <button 
        onClick={handleCheckout} 
        className="button checkout-button"
        disabled={userPoints < totalPrice || itemsToCheckout.length === 0}
      >
        결제하기
      </button>
      </div>
    </div>
  );
};

export default Checkout;