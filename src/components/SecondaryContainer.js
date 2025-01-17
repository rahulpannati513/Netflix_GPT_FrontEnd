import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);
  return (
    <div className="bg-black">
      <div className="-mt-40 relative z-20 py-3 ">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Popular Movies"} movies={movies?.nowPopularMovies} />
        <MovieList
          title={"Upcoming Movies"}
          movies={movies?.nowUpcomingMovies}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
