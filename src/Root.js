import React from "react";
import { Provider } from "react-redux";
// import PropTypes from "prop-types";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Main from "shared/Main";
import store from "store";
//date picker css
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store);

const Root = () => (
  <Provider store={store}>
    {/*
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Main />
    </BrowserRouter>
    */}
    <HashRouter>
      <Main />
    </HashRouter>
  </Provider>
);

export default Root;
