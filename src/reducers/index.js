import { persistCombineReducers } from "redux-persist";
import { AsyncStorage } from "react-native";
import AuthReducer from "./AuthReducer";
import CategoriesReducer from "./CategoriesReducer";
import MoviesReducer from "./MoviesReducer";
import PersonsReducer from "./PersonsReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"]
};

export default persistCombineReducers(persistConfig, {
  auth: AuthReducer,
  categories: CategoriesReducer,
  movies: MoviesReducer,
  persons: PersonsReducer
});
