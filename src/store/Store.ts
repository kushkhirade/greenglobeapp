import { reducers } from "../reducers/CombinedReducers";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

function configureStore() {
  const composeEnhancers =
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
  const storeData = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...getMiddlewares()))
  );
  return storeData;
}

function getMiddlewares() {
  return [thunk];
}

export const store = configureStore();
