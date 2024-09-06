import React from 'react';
import BannerSlide from '../components/BannerSlide';
import ProductList from '../components/ProductList';
import MainCarousel from '../components/MainCarousel';

const MainPage = () => {
  return (
    <div>
      <BannerSlide />
      <MainCarousel/>
      {/* <ProductList /> */}
    </div>
  );
};

export default MainPage;