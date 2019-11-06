import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "shared/Main";

const Root: React.FC = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

export default Root;
