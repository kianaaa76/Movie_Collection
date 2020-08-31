import {
  GET_CATEGORY_FAIL,
  GET_CATEGORY_LOADING,
  GET_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_LOADING,
  CREATE_CATEGORY_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  categoriesList: [],
  loading: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORY_LOADING:
      return { ...state, loading: true, error: "" };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categoriesList: action.payload,
        error: ""
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: "Getting categories list failed."
      };
    case CREATE_CATEGORY_LOADING:
      return { ...state, loading: true, error: "" };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        categoriesList: action.payload
      };
    case CREATE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: "Creating new category failed."
      };
    default:
      return state;
  }
};
