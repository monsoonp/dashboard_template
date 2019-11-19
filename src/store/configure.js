import { createStore, applyMiddleware } from "redux";
import modules from "./modules";
// import loggerMiddleware from "lib/loggerMiddleware";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

const configure = () => {
  // const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  // const store = createStore(modules, devTools);
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    modules,
    // applyMiddleware(loggerMiddleware, ReduxThunk)
    applyMiddleware(logger, ReduxThunk, sagaMiddleware)
    // applyMiddleware(ReduxThunk)
  );

  return store;
};

export default configure;
