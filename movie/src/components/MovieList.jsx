import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Autoplay, Pagination } from "swiper/modules";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function MovieList() {
  const [searchs, setSearchs] = useState("");
  const [result, setResult] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjA4OTlmZGRkODNlZDM4MWFhNDIzNjNiOTMzMmYxYiIsInN1YiI6IjY0ZmU0ZDhiYzJmZjNkMDExYmQ5Nzc2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q1aQsmoI71SVBfYeWNoAVCC2xhyqsR3hC3UYXWOgvww",
    },
  };
  const queryClient = useQueryClient();

  const fetchh = (url) => fetch(url, options).then((res) => res.json());

  const searchh = (e) => {
    e.preventDefault();

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchs}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setResult(response.results);
        console.log(response.results);
        setSearchs("");
      })
      .catch((err) => console.error(err));
  };

  const {
    isPending,
    error,
    data: popular,
  } = useQuery({
    queryKey: ["popular"],
    queryFn: () =>
      fetchh(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
      ),
  });

  const {
    isPending2,
    error2,
    data: popular2,
  } = useQuery({
    queryKey: ["popular2"],
    queryFn: () =>
      fetchh(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
      ),
  });

  const {
    isPending: seriesPending,
    error: seriesError,
    data: series,
  } = useQuery({
    queryKey: ["series"],
    queryFn: () =>
      fetchh("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"),
  });
  const {
    isPending: isPendingTrending,
    error: errorTtending,
    data: Trending,
  } = useQuery({
    queryKey: ["Trending"],
    queryFn: () =>
      fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      ).then((res) => res.json()),
  });

  return (
    <div className=" bg-slate-950 text-center pb-10">
      <div className="  font-black text-3xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> MOVIE BOX</div>
      <form onSubmit={(e) => searchh(e)} className="pt-2">
        <input
          type="search"
          placeholder="search..."
          value={searchs}
          className="md:w-[70vw] w-[90vw] py-1 rounded-md border-2"
          onChange={(e) => setSearchs(e.target.value)}
          name=""
          id=""
        />
      </form>

      {popular2 ? (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper h-[60vh] pt-5"
        >
          {popular.results?.map((pop) => {
            let im = "https://image.tmdb.org/t/p/w500" + pop.poster_path;
            return (
              <SwiperSlide key={pop.id}>
                <Link
                  to={`/movies/${pop.id}`}
                  className=" h-full  bg-contain bg-center w-full"
                  style={{ backgroundImage: `url(${im})` }}
                >
                  <span className="bg-slate-950 h-full text-slate-300 absolute bottom-0 ">
                    <span className=" font-extrabold grid text-center md:pt-10 text-2xl">
                      Overview:{" "}
                    </span>{" "}
                    <br />
                    {pop.overview}
                  </span>
                </Link>
                <div></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        isPending && (
          <div>
            <div className="w-full h-[50vh] md:h-[40vh] bg-slate-200 animate-pulse"></div>
          </div>
        )
      )}
      <div className="md:mx-5 lg:mx-8 xl:mx-20  ">
        <div className=" md:grid md:grid-cols-4 lg:grid-cols-6 gap-4 ">
          {result.length > 0 &&
            result?.map((res) => {
              return (
                <div className="md:mt-20">
                  <div
                    key={res.id}
                    className="shadow-lg p-2   hover:shadow-lg hover:shadow-red-500 "
                  >
                    <Link to={`/movies/${res.id}`}>
                      <div>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/w500" + res.poster_path
                          }
                          alt=""
                          className="min-h-full rounded-lg"
                        />
                        <div>
                          <span className=" font-bold text-white">Title: </span>
                          <span className=" font-medium text-white">
                            {res.original_title}
                          </span>
                        </div>
                        <div>
                          <span className=" font-bold text-white">
                            {" "}
                            Relase Date:{" "}
                          </span>
                          <span className="text-white font-medium">
                            {res.release_date}
                          </span>
                        </div>
                        <div></div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        {/* ---------------------------------------------error handling start ----------------------------------------*/}
        {error && "error " + error.message} <br />
        {seriesError && "error " + error.message} <br />
        {errorTtending && "error " + error.message}
        {/*------------------------------------------------------------- error handling stop --------------------*/}
        {/* --------------------------------------------------------------popular movies card start*/}
        {popular && result.length == 0 && (
          <>
            {" "}
            <div className="text-right pb-6 flex justify-between pt-5">
              <span className=" text-rose-600 md:text-3xl">Popular Movies</span>
              <Link to={`popular/`}>
                {" "}
                <span className="text-rose-600 md:text-3xl  hover:text-red-900 p-1 rounded-md">
                  {" "}
                  see more
                </span>
              </Link>
            </div>
            {popular && <MovieCard list={popular} />}
          </>
        )}
        {/* --------------------------------------------------------------popular movies card stop*/}
        {/* --------------------------------------------------------------trending movies card start*/}
        {Trending && result.length == 0 && (
          <>
            {" "}
            <div className="text-right pb-6 flex justify-between pt-5">
              <span className="text-rose-600 md:text-3xl">Trending Movies</span>
              <Link to={`trending/`}>
                {" "}
                <span className="text-rose-600 md:text-3xl  hover:text-red-900 p-1 rounded-md">
                  {" "}
                  see more
                </span>
              </Link>
            </div>
            {popular && <MovieCard list={Trending} />}{" "}
          </>
        )}
        {isPendingTrending && <Loading />}
        {/* --------------------------------------------------------------trending movies card stop*/}
        {/* --------------------------------------------------------------series card start*/}
        {series && result.length == 0 && (
          <>
            {" "}
            <div className="text-right pb-6 flex justify-between pt-5">
              <span className="text-rose-600 md:text-3xl">Trending Series</span>
              <Link to={`series/`}>
                {" "}
                <span className="text-rose-600 md:text-3xl  hover:text-red-900 p-1 rounded-md">
                  {" "}
                  see more
                </span>
              </Link>
            </div>
            {popular && <MovieCard list={series} />}
          </>
        )}
        {seriesPending && <Loading />}
        {/* --------------------------------------------------------------series card stop*/}
      </div>
    </div>
  );
}
