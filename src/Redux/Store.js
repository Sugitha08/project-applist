import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootsaga from "./Saga";
import RootReducer from "./Reducer";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const Store = configureStore({
  reducer: RootReducer,
  middleware: (defaultmiddleware) => defaultmiddleware().concat(middleware),
});

sagaMiddleware.run(rootsaga);
