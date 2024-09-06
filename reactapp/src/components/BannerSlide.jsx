/* 슬라이드 배너 컴포넌트
'Swiper' 라이브러리를 사용 (npm i swiper) */ 

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
<<<<<<< HEAD
=======
import './BannerSlide.css';
>>>>>>> origin/jykim



const BannerSlide = () => {
  return (
    <div className='banner-container'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={{ delay: 3000 }}
        className='mySwiper'
      >
<<<<<<< HEAD
       
        <SwiperSlide>
        <img src="https://img.29cm.co.kr/cms/202408/11ef5854b8fb03a1aad2bb58182c84f5.jpg?width=1200&q=75" alt="배너 이미지"/>
          </SwiperSlide>
        <SwiperSlide>
        <img src="https://img.29cm.co.kr/cms/202408/11ef556266fbabdb836215a90a00feba.jpg?width=1200&q=75" alt="배너 이미지"/>
=======
      
        <SwiperSlide>
        <img src="https://static.coupangcdn.com/ea/cmg_paperboy/image/1723520619708/C1_PC1%28%EC%97%85%EB%A1%9C%EB%93%9C-%EC%9A%A9%29.jpg" alt="배너 이미지"/>
          </SwiperSlide>
        <SwiperSlide>
        <img src="https://static.coupangcdn.com/ra/cmg_paperboy/image/1724998723153/C1_PC1%28%EC%97%85%EB%A1%9C%EB%93%9C%EC%9A%A9%292.jpg" alt="배너 이미지"/>
>>>>>>> origin/jykim
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default BannerSlide;