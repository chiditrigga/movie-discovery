import React, { useState } from "react";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function Trending() {
  const [page, setPage] = useState(1);
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
    data: trending,
    isFetching,
  } = useQuery({
    queryKey: ["trending", page],
    queryFn: () =>
      fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=" +
          page,
        options
      ).then((res) => res.json()),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className=" flex justify-between pt-3">
        <div>
          <Link to={"/"}>
            <button className=" opacity-50 rounded-md px-2 border-2 w-fit absolute p-5 left-0 bg-red-600 border-transparent top-0 hover:opacity-80 font-bold">
              Back
            </button>
          </Link>
        </div>
        <div>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className=" rounded-lg p-1 border-2 font-bold mx- hover:bg-red-600 hover:trxt-white"
          >
            Prev
          </button>

          <span className=" font-black mx-1 text-red-500">Page: {page}</span>

          {trending && (
            <button
              className=" rounded-lg p-1 border-2 font-bold mx- hover:bg-red-600 hover:trxt-white"
              onClick={() => setPage((old) => Math.max(old + 1, 1))}
              disabled={page === trending.total_pages}
              // Disable the Next Page button until we know a next page is available
            >
              Next Page
            </button>
          )}
        </div>
      </div>

      <div className=" md:grid md:grid-cols-4 lg:grid-cols-6 gap-4">
        {trending &&
          !isFetching &&
          trending.results?.map((pop) => {
            return (
              <div
                key={pop.id}
                className="shadow-lg p-2  hover:shadow-lg hover:shadow-red-500"
              >
                <Link to={`/movies/${pop.id}`}>
                  <div>
                    <img
                      src={"https://image.tmdb.org/t/p/w500" + pop.poster_path}
                      alt=""
                      className="min-h-full rounded-lg"
                    />
                    <div>
                      <span className=" font-bold">Title: </span>
                      <span className=" font-medium">{pop.original_title}</span>
                    </div>
                    <div>
                      <span className=" font-bold"> Relase Date: </span>
                      <span>{pop.release_date}</span>
                    </div>
                    <div></div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>

      {isPending | isFetching && (
        <div>
          <Loading /> <Loading /> <Loading />
        </div>
      )}
    </div>
  );
}
