// import Swiper core and required modules
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './MainCarousel.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';

const MainCarousel = () => {

  const carouselImages = [ 
    { src: "https://img.29cm.co.kr/next-product/2024/02/16/ab2b6356f61545b2bf1c931274cb396b_20240216162937.jpg?width=400"},
    { src: "https://img.29cm.co.kr/next-product/2024/08/13/c9a21e5a68f244d1888de5745e90d213_20240813170858.jpg?width=400"},
    { src: "https://img.29cm.co.kr/item/202408/11ef637d7f168a978362c36c6c030510.jpg?width=400"},
    { src: "https://img.29cm.co.kr/item/202408/11ef60edf00e76e5836249b07e30b02c.jpg?width=400"},
    { src: "https://img.29cm.co.kr/item/202408/11ef586c28fc99db89fb2dce0001440c.jpg?width=400"},
    { src: "https://img.29cm.co.kr/item/202312/11ee9a3a1440ddbf91ebdf3b0b332bda.jpg?width=400"},
    { src: "https://img.29cm.co.kr/next-product/2023/03/09/e17f965fd9a84ddba159eb0ee063c915_20230309103021.jpg?width=400"},
  ];


  return (
    <div className="main-carousel-container">
            <h5>Best</h5>
      <Swiper
        // install Swiper modules
        modules={[ Autoplay, Navigation, Pagination, A11y]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        // loop = {true}
        className="main-carousel-swiper"
      >

        {carouselImages.map((item, idx) => {
          return (
        <SwiperSlide key={idx} className="main-carousel-slide">
          <img src={item.src} alt={`캐러셀 ${idx + 1}`} width={350} height={350}/>
        </SwiperSlide>
          )
        })}
        
      </Swiper>
    </div>
  )
};

export default MainCarousel;