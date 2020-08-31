import axios from "axios";
import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  GET_CATEGORY_LOADING,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_LOADING,
  CREATE_CATEGORY_SUCCESS,
  CREATE_MOVIE_FAIL,
  CREATE_MOVIE_LOADING,
  CREATE_MOVIE_SUCCESS,
  GET_CATEGORY_MOVIES_LOADING,
  GET_CATEGORY_MOVIES_FAIL,
  GET_CATEGORY_MOVIES_SUCCESS,
  GET_ALL_MOVIES_LOADING,
  GET_ALL_MOVIES_FAIL,
  GET_ALL_MOVIES_SUCCESS,
  DELETE_MOVIE_LOADING,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAIL,
  GET_PERSONS_FAIL,
  GET_PERSONS_LOADING,
  GET_PERSONS_SUCCESS,
  PATCH_MOVIE_FAIL,
  PATCH_MOVIE_LOADING,
  PATCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAIL,
  SEARCH_MOVIE_LOADING,
  SEARCH_MOVIE_SUCCESS,
  LOGOUT_USER,
  LOCAL_HOST
} from "./types.js";

export const loginUser = ({ username, password }) => {
  return dispatch => {
    dispatch({
      type: LOGIN_USER_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .post(`${LOCAL_HOST}/user/auth-token`, {
          username,
          password
        })
        .then(response => {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: response.data.token
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: LOGIN_USER_FAIL
          });
          reject();
        });
    });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_USER,
      payload: null
    });
  };
};

export const getCategories = ({ token }) => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORY_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `${LOCAL_HOST}/category`,
          {},
          {
            headers: { Authorization: `Token ${token}` }
          }
        )
        .then(response => {
          dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: response.data.results
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: GET_CATEGORY_FAIL
          });
          reject();
        });
    });
  };
};

export const createCategory = ({ token, name }) => {
  return dispatch => {
    dispatch({
      type: CREATE_CATEGORY_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .post(
          `${LOCAL_HOST}/category/`,
          {
            name
          },
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        .then(response => {
          dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: response.data
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: CREATE_CATEGORY_FAIL
          });
          reject();
        });
    });
  };
};

export const getCategoryMovies = ({ token, categoryName }) => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORY_MOVIES_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `${LOCAL_HOST}/movie/?tags=${categoryName}`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        .then(response => {
          dispatch({
            type: GET_CATEGORY_MOVIES_SUCCESS,
            payload: response.data.results
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: GET_CATEGORY_MOVIES_FAIL
          });
          reject();
        });
    });
  };
};

export const getAllMovies = ({ token }) => {
  return dispatch => {
    dispatch({
      type: GET_ALL_MOVIES_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .get(
          `${LOCAL_HOST}/movie`,
          {},
          {
            headers: { Authorization: `Token ${token}` }
          }
        )
        .then(response => {
          dispatch({
            type: GET_ALL_MOVIES_SUCCESS,
            payload: response.data.results
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: GET_ALL_MOVIES_FAIL
          });
          reject();
        });
    });
  };
};

export const deleteMovie = ({ token, id }) => {
  return dispatch => {
    dispatch({
      type: DELETE_MOVIE_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .delete(`${LOCAL_HOST}/movie/${id}/`, {
          headers: { Authorization: `Token ${token}` }
        })
        .then(response => {
          dispatch({
            type: DELETE_MOVIE_SUCCESS,
            payload: response.data
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: DELETE_MOVIE_FAIL
          });
          reject();
        });
    });
  };
};

export const editMovie = ({
  token,
  id,
  title,
  date_of_release,
  tags,
  country,
  language,
  director,
  cast
}) => {
  return dispatch => {
    dispatch({
      type: PATCH_MOVIE_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .put(
          `${LOCAL_HOST}/movie/${id}/`,
          {
            title,
            date_of_release,
            tags,
            country,
            language,
            director,
            cast
          },
          {
            headers: { Authorization: `Token ${token}` }
          }
        )
        .then(response => {
          dispatch({
            type: PATCH_MOVIE_SUCCESS,
            payload: response.data
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: PATCH_MOVIE_FAIL
          });
          reject();
        });
    });
  };
};

export const createMovie = ({
  token,
  title,
  date_of_release,
  tags,
  country,
  language,
  director,
  cast
}) => {
  return dispatch => {
    dispatch({
      type: CREATE_MOVIE_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .post(
          `${LOCAL_HOST}/movie/`,
          {
            title,
            date_of_release,
            tags,
            country,
            language,
            director,
            cast
          },
          {
            headers: { Authorization: `Token ${token}` }
          }
        )
        .then(response => {
          dispatch({
            type: CREATE_MOVIE_SUCCESS,
            payload: response.data
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: CREATE_MOVIE_FAIL
          });
          reject();
        });
    });
  };
};

export const getPersons = ({ token }) => {
  return dispatch => {
    dispatch({
      type: GET_PERSONS_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .get(`${LOCAL_HOST}/person`, {
          headers: { Authorization: `Token ${token}` }
        })
        .then(response => {
          dispatch({
            type: GET_PERSONS_SUCCESS,
            payload: response.data.results
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: GET_PERSONS_FAIL
          });
          reject();
        });
    });
  };
};

export const search = ({token, value}) =>{
  return dispatch => {
    dispatch({
      type: SEARCH_MOVIE_LOADING
    });
    return new Promise(function(resolve, reject) {
      axios
        .get(`${LOCAL_HOST}/movie/?search=${value}`, {
          headers: { Authorization: `Token ${token}` }
        })
        .then(response => {
          dispatch({
            type: SEARCH_MOVIE_SUCCESS,
            payload: response.data.results
          });
          resolve();
        })
        .catch(err => {
          dispatch({
            type: SEARCH_MOVIE_FAIL
          });
          reject();
        });
    });
  };
}
