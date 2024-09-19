/**useWishlist.js
 * 찜하기 기능을 담당하는 useWishlist 훅
 */

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const [checkedItems, setCheckedItems] = useState({});

  // 위시리스트 데이터 가져오기 -> 찜 여부 확인
  const getWishlist = async () => {
    const loginId = sessionStorage.getItem('id');
    const response = await axios.get(`${API_URL}/api/wishlist/${loginId}`);
    return response.data;
  };

  const { data: wishlist, isLoading, error } = useQuery({
    queryKey: ['wishlist', loginId],
    queryFn: () => getWishlist(loginId),
    onError: (err) => {
      console.error("찜 목록 fetch 오류", err);
    }

  });

  // 위시리스트에서 제거
  const removeFromWishlist = async (productId) => {
    const response = await axios.delete(`${API_URL}/api/wishlist/${productId}`);
    return response.data;
  };

  const removeWishlistMutation = useMutation(removeFromWishlist, {
    onMutate: async (productId) => {
      await queryClient.cancelQueries('wishlist');
      const previousWishlist = queryClient.getQueryData('wishlist');
      queryClient.setQueryData('wishlist', old => old.filter(item => item.productId !== productId));
      return { previousWishlist };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData('wishlist', context.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries('wishlist');
    },
  });

  // 위시리스트에 추가
  const addToWishlist = async (productId) => {
    const response = await axios.post(`${API_URL}/api/wishlist`, { productId });
    return response.data;
  };

  const addWishlistMutation = useMutation(addToWishlist, {
    onMutate: async (productId) => {
      await queryClient.cancelQueries('wishlist');
      const previousWishlist = queryClient.getQueryData('wishlist');
      // Optimistically update the wishlist
      queryClient.setQueryData('wishlist', old => [...old, { productId }]);
      return { previousWishlist };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData('wishlist', context.previousWishlist);
    },
    onSettled: () => {
      queryClient.invalidateQueries('wishlist');
    },
  });

  // 위시리스트 토글 (추가 또는 제거)
  const toggleWishlist = useCallback((productId) => {
    if (wishlist.some(item => item.productId === productId)) {
      removeWishlistMutation.mutate(productId);
    } else {
      addWishlistMutation.mutate(productId);
    }
  }, [wishlist, removeWishlistMutation, addWishlistMutation]);

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
