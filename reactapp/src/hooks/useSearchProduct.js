/** useSearchProduct.js
 * useSearchProduct 훅. 네비게이션바 Searchbar에서 상품 이름, 상세 정보에 포함되는 텍스트로 검색.
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSearchProducts = async ({ queryKey }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [_, keyword] = queryKey;
  console.log('Fetching with keyword:', keyword);
  try {
    const response = await axios.get(`${API_URL}/api/search`, {
      params: { keyword }
    });
    console.log('API response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('API error:', error.response || error);
    throw error;
  }
};

export const useSearchProducts = (keyword) => {
  return useQuery({
    queryKey: ['searchProducts', keyword],
    queryFn: fetchSearchProducts,
    enabled: !!keyword,
    retry: 1,
    onError: (error) => {
      console.error('Query error:', error.response || error);
    }
  });
};