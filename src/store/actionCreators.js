import { bindActionCreators } from "redux";
import * as homeActions from "store/modules/home";
import * as fetchActions from "store/modules/fetchData";

import store from "./index";

const { dispatch } = store;

export const HomeActions = bindActionCreators(homeActions, dispatch);
export const FetchActions = bindActionCreators(fetchActions, dispatch);
