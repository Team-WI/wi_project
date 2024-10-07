/* 슬라이드 배너 컴포넌트
'Swiper' 라이브러리를 사용 (npm i swiper) */ 

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import './BannerSlide.css';


const BannerSlide = () => {
  return (
    <div className='banner-container mt-4'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        autoplay={{ delay: 4000 }}
        className='mySwiper'
      >
      
        <SwiperSlide>
          <img 
          src="https://via.placeholder.com/1920x450?text=Banner+Image1" 
          alt="배너 이미지1"
          loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="https://via.placeholder.com/1920x450?text=Banner+Image2" 
            alt="배너 이미지2"
            loading="lazy"
            />
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};
export default BannerSlide;