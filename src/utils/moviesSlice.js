import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPopularMovies: null,
    nowUpcomingMovies: null,
    nowPlayingMovies: null,
    trailerVideo: null,
    movieSuggestionList: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.nowPopularMovies = action.payload;
    },
    addPUpcomingMovies: (state, action) => {
      state.nowUpcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addMovieSuggestionList: (state, action) => {
      state.movieSuggestionList = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addPUpcomingMovies,
  addMovieSuggestionList,
} = moviesSlice.actions;

export default moviesSlice.reducer;
