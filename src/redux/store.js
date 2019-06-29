import { createStore } from "redux";
import rootReducer from "./reducers";

export default (process.env.NODE_ENV === "development")
  ? createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  : createStore(
    rootReducer
  );