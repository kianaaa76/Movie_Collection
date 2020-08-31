import {
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER
} from "../actions/types";

const INITIAL_STATE = {
  token: "",
  loading: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_LOADING:
      return { ...state, loading: true, error: "" };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, token: action.payload, error: "" };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, error: "Authentication Failed." };
    case LOGOUT_USER:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
