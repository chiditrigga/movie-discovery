import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function MovieCard({ list }) {
  return (
    <div>
      <Swiper
        slidesPerView={2.2}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.8,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3.8,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4.8,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {list.results?.map((lis) => {
          return (
            <SwiperSlide
              key={lis.id}
              className="hover:shadow-2xl hover:shadow-red-400"
            >
              <Link to={`/movies/${lis.id}`}>
                <div className=" rounded-md">
                  <div>
                    <img
                      src={"https://image.tmdb.org/t/p/w500" + lis.poster_path}
                      alt=""
                      className="min-h-full"
                    />
                  </div>
                  <span className=" font-black py-2">{lis.title}</span>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
