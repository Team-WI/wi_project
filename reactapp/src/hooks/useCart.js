/** useCart.js 
 * useCart 훅. 장바구니 데이터 관련된 모든 기능을 관리(Tanstack query)
 * sessionStorage에서 로그인한 사용자의 Id를 가져와 API 요청
 * 
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// API 요청 함수들
// 리프레쉬 토큰 요청 함수
const refreshToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/refreshToken`, {
      withCredentials: true
    });
    // 새로운 액세스 토큰을 로컬 스토리지에 저장
    if (response.data && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// 장바구니 데이터 호출 함수
const getCartItems = async () => {
  const loginId = sessionStorage.getItem('id');
  console.log("현재 로그인 유저 아이디:", loginId)
  try {
  const response = await axios.get(`${API_URL}/api/shoppingCarts/${loginId}`, { 
    withCredentials: true  
  });
  return response.data.data;
} catch (error) {
  if (error.response && error.response.status === 404) {
    console.log("Shopping cart is empty");
    return []; 
  }
  throw error; 
}
};

// 장바구니 상품 추가 함수 (상품 상세페이지)
const addToCart = async ({ productId, quantity = 1 }) => {
  const loginId = sessionStorage.getItem('id');
  const response = await axios.post(`${API_URL}/api/shoppingCarts`, 
  { loginId, productId, quantity },
  { withCredentials: true }  
  );
  return response.data;
};

// 장바구니 상품 수량 변경 함수
const updateQuantity = async ( {shoppingCartId, quantity }) => {
  const response = await axios.put(`${API_URL}/api/shoppingCarts/${shoppingCartId}`, 
  { quantity },
  { withCredentials: true }
  );
  return response.data;
};

// 장바구니 상품 삭제 함수
const removeFromCart = async (shoppingCartId) => {
  await axios.delete(`${API_URL}/api/shoppingCarts/${shoppingCartId}`, {
    withCredentials: true
  });
};


// useCart 훅
export const useCart = () => {
  const queryClient = useQueryClient();


  // 요청 실패 시 토큰 갱신 및 재시도 로직
  const handleTokenRefresh = async (error, operation) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshToken();
        return await operation();     // 토큰 갱신 후 원래 요청 재시도
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    }
    throw error;
  };

  // useQuery 훅. 장바구니 데이터 호출
  const { data: cartItems = [], isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      try {
      const items = await getCartItems().catch(error => handleTokenRefresh(error, getCartItems));
      return items.map(item => ({...item, checked: true}));  // 체크박스 초기상태: checked
    } catch (error) {
      console.error("Failed to fetch cart items:", error)
      return [];
    }
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  // useMutation 훅. 장바구니 추가, 수량 변경, 삭제 
  const addToCartMutation = useMutation({
    mutationFn: (data) => addToCart(data).catch(error => handleTokenRefresh(error, () => addToCart(data))),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ shoppingCartId, quantity }) => updateQuantity(shoppingCartId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (id) => removeFromCart(id).catch(error =>  handleTokenRefresh(error, () => removeFromCart(id))),
    onSuccess: () => 
      queryClient.invalidateQueries(['cart'])
  });

  const addToCart = (productId, quantity = 1) => {
    addToCartMutation.mutate({ productId, quantity });
  };

  const updateQuantity = (shoppingCartId, quantity) => {
    updateQuantityMutation.mutate({ shoppingCartId, quantity });
  };

  const removeFromCart = (shoppingCartId) => {
    removeFromCartMutation.mutate(shoppingCartId);
  };

  // 총 주문금액
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 체크박스 (개별상품)
  const toggleItemCheck = (shoppingCartId) => {
    queryClient.setQueryData(['cart'], (oldData) => {
      return oldData.map(item => 
        item.shoppingCartId === shoppingCartId
          ? { ...item, checked: !item.checked }
          : item
        );
      });
  }

  // 체크박스 (전체상품)
  const toggleAllCheck = (checked) => {
    queryClient.setQueryData(['cart'], (oldData) => {
      return oldData.map(item => ({ ...item, checked }));
    });
  };


  return {
    cartItems,
    isLoading: isCartLoading, 
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalPrice,
    toggleItemCheck,
    toggleAllCheck,

  };
};