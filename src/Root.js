import React from "react";
import { Provider } from "react-redux";
// import PropTypes from "prop-types";
import { BrowserRouter, HashRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";

import Main from "shared/Main";
import store from "store";
//date picker css
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store);

const Root = () => {
  /*
  const response = {
    response: false,
    endpoint: "http://localhost:5000"
  };
  const { endpoint } = response;
  */
  const socket = socketIOClient("http://localhost:5000");

  return (
    <Provider store={store}>
      {process.env.PUBLIC_URL === "/dashboard_template" ? (
        <HashRouter>
          <Main />
        </HashRouter>
      ) : (
        <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
          <Main socket={socket} />
        </BrowserRouter>
      )}
    </Provider>
  );
};

export default Root;
