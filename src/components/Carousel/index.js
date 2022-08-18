import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// import banner1 from "../../Assets/banners/banner1.svg";
import banner2 from "../../Assets/banners/banner2.svg";
// import banner3 from "../../Assets/banners/banner3.svg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

function Carousel() {
  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
          <img src="https://i.ibb.co/HHDMLC2/banner1.png" alt="banner1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} alt="banner2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/5Rj93Sp/banner3.png" alt="banner3" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Carousel;
