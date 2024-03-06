import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function Loading() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="mySwiper animate-pulse py-3"
      >
        <SwiperSlide className="">
          <span className="h-60 bg-slate-200 md:w-40 w-[80%] rounded-md"></span>
        </SwiperSlide>
        <SwiperSlide className="">
          <span className="h-60 bg-slate-200 md:w-40 w-[80%] rounded-md"></span>
        </SwiperSlide>
        <SwiperSlide className="">
          <span className="h-60 bg-slate-200 md:w-40 w-[80%] rounded-md"></span>
        </SwiperSlide>
        <SwiperSlide className="">
          <span className="h-60 bg-slate-200 md:w-40 w-[80%] rounded-md"></span>
        </SwiperSlide>
        <SwiperSlide className="">
          <span className="h-60 bg-slate-200  md:w-40 w-[80%]"></span>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
