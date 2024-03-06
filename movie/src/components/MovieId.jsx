import { Link, useParams } from "react-router-dom";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";
import LoadingSecond from "./LoadingSecond";

export default function MovieId() {
  const { id } = useParams();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjA4OTlmZGRkODNlZDM4MWFhNDIzNjNiOTMzMmYxYiIsInN1YiI6IjY0ZmU0ZDhiYzJmZjNkMDExYmQ5Nzc2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q1aQsmoI71SVBfYeWNoAVCC2xhyqsR3hC3UYXWOgvww",
    },
  };
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    data: movieId,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetch(`https://api.themoviedb.org/3/movie/${id}`, options).then((res) =>
        res.json()
      ),
  });

  return (
    <div>
      {movieId && !isFetching && (
        <div
          style={{
            backgroundImage: `url( https://image.tmdb.org/t/p/w500${movieId.backdrop_path})`,
          }}
          className=" bg-no-repeat bg-cover"
        >
          <div className="backdrop-brightness-50  md:grid grid-cols-2 gap-x-2 md:px-[1vw] lg:px-[1vw]  text-white md:h-screen min-h-screen">
            <div className=" content-center grid ">
              <span>
                <Link to={"/"}>
                  <button className=" opacity-50 rounded-md px-2 border-2 w-fit absolute p-5 left-0 bg-red-600 border-transparent top-0 hover:opacity-80 font-bold">
                    Back
                  </button>
                </Link>
              </span>
              <img
                src={`https://image.tmdb.org/t/p/w500${movieId.poster_path}`}
                className="max-h-screen lg:p-10 p-2 md:p-7"
              />
            </div>
            <div className="content-center grid px-2 md:px-0">
              <div className="  font-black text-3xl py-4">
                {movieId.original_title}
              </div>
              <div className=" font-bold pb-4">{movieId.overview}</div>
              <div className="pb-3">
                <span className=" text-red-600 font-black text-2xl">
                  Genres:{" "}
                </span>
                {movieId.genres?.map((gen) => {
                  return (
                    <span className=" text-slate-200 " key={gen.id}>
                      <span>
                        <button className=" border-2  rounded-2xl px-3 mx-2 hover:bg-red-600 text-white">
                          {gen.name}
                        </button>
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div></div>
        </div>
      )}
      {isFetching && <LoadingSecond />}

      {error && "error " + error.message}
    </div>
  );
}
