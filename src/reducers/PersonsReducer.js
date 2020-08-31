import {
    GET_PERSONS_LOADING,
    GET_PERSONS_SUCCESS,
    GET_PERSONS_FAIL
  } from "../actions/types";
  
  const INITIAL_STATE = {
    personList: [],
    personLoading: false,
    error: ""
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_PERSONS_LOADING:
        return { ...state, loading: true, error: "" };
      case GET_PERSONS_SUCCESS:
        return { ...state, loading: false, personList: action.payload, error: "" };
      case GET_PERSONS_FAIL:
        return { ...state, loading: false, error: "Getting persons failed." };
      default:
        return state;
    }
  };
  