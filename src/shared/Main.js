import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

// import AdminLayout from "layouts/Admin.jsx";
import AdminLayout from "client/Admin.jsx";
import TestLayout from "client/TestClient.js";
// import AuthLayout from "layouts/Auth.jsx";
import AuthLayout from "client/Auth.jsx";

const Main = ({ socket }) => {
  return (
    <Switch>
      <Route
        path={`/admin`}
        render={props => <AdminLayout {...props} socket={socket} />}
      />
      <Route
        path={`/test`}
        render={props => <TestLayout {...props} socket={socket} />}
      />
      <Route path={`/auth`} render={props => <AuthLayout {...props} />} />
      <Redirect from={`/`} to="/test/home" />
    </Switch>
  );
};

export default Main;
