import React, { useState, useEffect } from 'react';
import BannerSlide from '../components/BannerSlide';
import ProductList from '../components/ProductList';
import MainCarousel from '../components/MainCarousel';
import { Container } from 'react-bootstrap'; 
import { Vertical } from '../components/Layout/Vertical';

const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 여기서 실제 API 호출을 통해 제품 데이터를 가져올 수 있습니다.
    // 지금은 예시를 위해 setTimeout을 사용하여 비동기 작업을 시뮬레이션합니다.
    const fetchProducts = () => {
      setTimeout(() => {
        const sampleProducts = Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          name: `상품 ${i + 1}`,
          price: Math.floor(Math.random() * 100000) + 10000,
          imageUrl: `https://via.placeholder.com/200`
        }));
        setProducts(sampleProducts);
      }, 1000);
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <BannerSlide />
      <MainCarousel/>
      <Vertical products={products} />      
    </Container>
  );
};

export default MainPage;