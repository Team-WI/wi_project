/** useCart.js 
 * useCart 훅. 장바구니 관련된 모든 기능을 관리(Tanstack query)
 * sessionStorage에서 로그인한 사용자의 Id를 가져와 API 요청
 * 
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://https://wispmall.duckdns.org/api/cart';

const getCartItems = async () => {
  const loginId = sessionStorage.getItem('id');
  const response = await axios.post(`${BASE_URL}/list`, { loginId });
  return response.data.data;
};

const addCartItem = async (productId, quantity = 1) => {
  const loginId = sessionStorage.getItem('id');
  const response = await axios.post(`${BASE_URL}/add`, { loginId, productId, quantity });
  return response.data;
};

const updateCartItemQuantity = async (shoppingCartId, quantity) => {
  const response = await axios.put(`${BASE_URL}/update/${shoppingCartId}`, { quantity });
  return response.data;
};

const removeCartItem = async (shoppingCartId) => {
  await axios.delete(`${BASE_URL}/remove/${shoppingCartId}`);
};

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  // 장바구니 추가, 수량 변경, 삭제 
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }) => addCartItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ shoppingCartId, quantity }) => updateCartItemQuantity(shoppingCartId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cartItems,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalPrice,
  };
};