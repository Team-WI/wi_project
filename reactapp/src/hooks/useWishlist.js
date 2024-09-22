/**useWishlist.js
 * 찜하기 기능을 담당하는 useWishlist 훅
 */

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const [checkedItems, setCheckedItems] = useState({});   // 찜한 상품 리스트 페이지에서 상품 선택 체크박스

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

  // 찜한 상품리스트 데이터 가져오기 -> 찜 여부 확인
  const getWishlist = async () => {
    const loginId = sessionStorage.getItem('id'); 
    if (!loginId) return [];
    try {
      const response = await axios.get(`${API_URL}/api/wishlist/${loginId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        const response = await axios.get(`${API_URL}/api/wishlist/${loginId}`, {
          withCredentials: true
        });
        return response.data;
      }
      throw error;
    }
  };

  // 위시리스트에서 제거
  const removeFromWishlist = async (productId) => {
    const loginId = sessionStorage.getItem('id'); 
    const response = await axios.post(`${API_URL}/api/wishlist/${loginId}`, { productId }, {
      withCredentials: true
    });
    return response.data;
  };

  const removeWishlistMutation = useMutation(removeFromWishlist, {
    onMutate: async (productId) => {
      await queryClient.cancelQueries(['wishlist', loginId]);
      const previousWishlist = queryClient.getQueryData(['wishlist', loginId]);
      queryClient.setQueryData(['wishlist', loginId], old => old.filter(item => item.productId !== productId));
      return { previousWishlist };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(['wishlist', loginId], context.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['wishlist', loginId]);
    },
  });

  // 위시리스트에 추가
  const addToWishlist = async (productId) => {
    const loginId = sessionStorage.getItem('id'); 
    const response = await axios.post(`${API_URL}/api/wishlist/${loginId}`, { productId }, {
      withCredentials: true
    });
    return response.data;
  };

  const addWishlistMutation = useMutation(addToWishlist, {
    onMutate: async (productId) => {
      await queryClient.cancelQueries(['wishlist', loginId]);
      const previousWishlist = queryClient.getQueryData(['wishlist', loginId]);
      // 낙관적 업데이트 
      queryClient.setQueryData(['wishlist', loginId], old => [...old, { productId }]);
      return { previousWishlist };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(['wishlist', loginId], context.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['wishlist', loginId]);
    },
  });

  // 위시리스트 토글 (추가 또는 제거)
  const toggleWishlist = useCallback((productId) => {
    const loginId = sessionStorage.getItem('id'); 

    if (!loginId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    if (wishlist && wishlist.some(item => item.productId === productId)) {
      removeWishlistMutation.mutate(productId);
    } else {
      addWishlistMutation.mutate(productId);
    }
  }, [loginId, wishlist, removeWishlistMutation, addWishlistMutation]);

  // 상품이 위시리스트에 있는지 확인
  const isInWishlist = useCallback((productId) => {
    return wishlist ? wishlist.some(item => item.productId === productId) : false;
  }, [wishlist]);

  // 체크박스 토글
  const toggleItemCheck = useCallback((productId) => {
    setCheckedItems(prev => ({...prev, [productId]: !prev[productId]}));
  }, []);

  // 전체 선택/해제
  const toggleAllCheck = useCallback((checked) => {
    if (wishlist) {
      const newCheckedItems = {};
      wishlist.forEach(item => {
        newCheckedItems[item.productId] = checked;
      });
      setCheckedItems(newCheckedItems);
    }
  }, [wishlist]);

  // 선택된 아이템 가져오기
  const getCheckedItems = useCallback(() => {
    if (wishlist) {
      return wishlist.filter(item => checkedItems[item.productId]);
    }
    return [];
  }, [wishlist, checkedItems]);

  return {
    wishlist,
    isLoading,
    error,
    checkedItems,
    removeFromWishlist: removeWishlistMutation.mutate,
    addToWishlist: addWishlistMutation.mutate,
    toggleWishlist,
    isInWishlist,
    toggleItemCheck,
    toggleAllCheck,
    getCheckedItems
  };
};
