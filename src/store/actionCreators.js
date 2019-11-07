import { bindActionCreators } from "redux";
import * as homeActions from "store/modules/home";

import store from "./index";

const { dispatch } = store;

export const HomeActions = bindActionCreators(homeActions, dispatch);
