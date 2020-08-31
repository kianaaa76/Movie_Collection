import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import ReduxThunk from "redux-thunk";
import reducers from "../reducers";


export default () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  const persistor = persistStore(store);
  return { store, persistor };
};