/** useCheckout.jsx
 * 결제 기능 
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

// API 요청 함수
// refresh token 관련 함수(임시)
const refreshToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/refreshToken`, {
      withCredentials: true
    });
    if (response.data && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// 사용자 보유 포인트 호출 (임시)
const getUserPoints = async () => {
  const loginId = sessionStorage.getItem('id');
  const response = await axios.get(`${API_URL}/api/users/${loginId}/points`, { 
    withCredentials: true  
  });
  return response.data.data;
};

// 장바구니 상품 결제
const getCheckoutItems = async () => {
  const loginId = sessionStorage.getItem('id');
  const response = await axios.get(`${API_URL}/api/shoppingCarts/${loginId}`, {
    withCredentials: true
  });
  return response.data.data.filter(item => item.checked)
}

// 단일 상품 결제

// 총 주문금액 결제하기 함수
const handlePayment = async ({ totalAmount }) => {
  const loginId = sessionStorage.getItem('id');
  const response = await axios.post(`${API_URL}/api/checkout`,
  { loginId, totalAmount},
  { withCredentials: true }
  );
  return response.data;
};

// 결제하기 훅
export const useCheckout = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  // 단일 상품 바로 구매 모드
  const buyNowMode = location.state?.buyNow;
  const buyNowProduct = location.state?.product;

  const handleTokenRefresh = async (error, operation) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshToken();
        return await operation();
      } catch (refreshError) {
        console.error("토큰 리프레시 실패", refreshError);
        throw refreshError;
      }
    }
    throw error;
  };

  const { data: checkoutItems = [], isLoading: isLoading, error: error } = useQuery({
    queryKey: ['checkout'],
    queryFn: async () => {
      if (buyNowMode) {
        return [buyNowProduct];
      } else {
      return await getCheckoutItems().catch(error => handleTokenRefresh(error, getCheckoutItems));
      }
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const paymentMutation = useMutation({
    mutationFn: (data) => handlePayment(data).catch(error => handleTokenRefresh(error, () => handlePayment(data))),
    onSuccess: () => {
      queryClient.invalidateQueries(['checkout', 'cart']);
    },
  });

  const processCheckout = (totalAmount) => {
    paymentMutation.mutate({ totalAmount });
  };

  const totalPrice = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    checkoutItems,
    isLoading,
    error,
    processCheckout,
    totalPrice,
  };
};
