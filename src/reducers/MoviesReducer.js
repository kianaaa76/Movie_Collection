import {
  GET_ALL_MOVIES_FAIL,
  GET_ALL_MOVIES_LOADING,
  GET_ALL_MOVIES_SUCCESS,
  PATCH_MOVIE_FAIL,
  PATCH_MOVIE_LOADING,
  PATCH_MOVIE_SUCCESS,
  CREATE_MOVIE_FAIL,
  CREATE_MOVIE_LOADING,
  CREATE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAIL,
  DELETE_MOVIE_LOADING,
  DELETE_MOVIE_SUCCESS,
  GET_CATEGORY_MOVIES_LOADING,
  GET_CATEGORY_MOVIES_SUCCESS,
  GET_CATEGORY_MOVIES_FAIL,
  SEARCH_MOVIE_FAIL,
  SEARCH_MOVIE_LOADING,
  SEARCH_MOVIE_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  allMovies: [],
  categoryMoviesList: [],
  allMovieLoading: false,
  movieCategoryLoading: false,
  movieError: "",
  searchMovieLoading: false,
  searchMovieList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORY_MOVIES_LOADING:
      return { ...state, movieCategoryLoading: true, movieError: "" };
    case GET_CATEGORY_MOVIES_SUCCESS:
      return {
        ...state,
        movieCategoryLoading: false,
        categoryMoviesList: action.payload,
        movieError: ""
      };
    case GET_CATEGORY_MOVIES_FAIL:
      return {
        ...state,
        movieCategoryLoading: false,
        movieError: "Getting category movies failed."
      };
    case GET_ALL_MOVIES_LOADING:
      return { ...state, allMovieLoading: true, movieError: "" };
    case GET_ALL_MOVIES_SUCCESS:
      return {
        ...state,
        allMovieLoading: false,
        allMovies: action.payload,
        movieError: ""
      };
    case GET_ALL_MOVIES_FAIL:
      return {
        ...state,
        allMovieLoading: false,
        movieError: "Getting all movies failed."
      };
    case DELETE_MOVIE_LOADING:
      return { ...state, allMovieLoading: true, movieError: "" };
    case DELETE_MOVIE_SUCCESS:
      return { ...state, allMovieLoading: false, movieError: "" };
    case DELETE_MOVIE_FAIL:
      return {
        ...state,
        allMovieLoading: false,
        movieError: "Delete movie faild."
      };
    case CREATE_MOVIE_LOADING:
      return { ...state, allMovieLoading: true, movieError: "" };
    case CREATE_MOVIE_SUCCESS:
      return { ...state, allMovieLoading: false, movieError: "" };
    case CREATE_MOVIE_FAIL:
      return {
        ...state,
        allMovieLoading: false,
        movieError: "Delete movie faild."
      };
    case PATCH_MOVIE_LOADING:
      return { ...state, allMovieLoading: true, movieError: "" };
    case PATCH_MOVIE_SUCCESS:
      return { ...state, allMovieLoading: false, movieError: "" };
    case PATCH_MOVIE_FAIL:
      return {
        ...state,
        allMovieLoading: false,
        movieError: "Delete movie faild."
      };
    case SEARCH_MOVIE_LOADING:
      return { ...state, searchMovieLoading: true };
    case SEARCH_MOVIE_FAIL:
      return { ...state, searchMovieLoading: false };
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        searchMovieLoading: false,
        searchMovieList: action.payload
      };
    default:
      return state;
  }
};
