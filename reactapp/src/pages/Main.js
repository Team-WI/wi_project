import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// swiper 필요한 모듈 import.
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Main = () => {
  
  const images = [
    "/main-1.jpg",
    "/main-2.jpg",
    "/main-3.jpg",
  ];

  const ImageSwiper = () => {
    return (
      <Swiper
        spaceBetween={10} // 슬라이드 간의 간격
        slidesPerView={1} // 한 번에 보여줄 슬라이드 수
        navigation={true} // 화살표 네비게이션 사용
        pagination={{ clickable: true }} // 페이지네이션 사용
        autoplay={{ delay: 3000 }} // 자동 재생 (3초 간격)
        loop={true} // 무한 스크롤
        modules={[Navigation, Pagination, Autoplay]} // 모듈을 등록합니다.
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index}`} style={{ width: "100%", height: "60%" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <div className="main">
      
      <div className="image" />
      <ImageSwiper />
    </div>
  );
};

export default Main;
