import { createStore } from "redux";
import modules from "./modules";

const configure = () => {
  // const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  // const store = createStore(modules, devTools);
  const store = createStore(modules);

  return store;
};

export default configure;
