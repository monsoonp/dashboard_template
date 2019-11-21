import { bindActionCreators } from "redux";
import * as homeActions from "store/modules/home";
// import * as typedHomeActions from "store/modules/typedHome";
// import * as fetchActions from "store/modules/fetchData";

import store from "./index";

const { dispatch } = store;

export const HomeActions = bindActionCreators(homeActions, dispatch);
// export const TypedHomeActions = bindActionCreators(typedHomeActions, dispatch);
// export const FetchActions = bindActionCreators(fetchActions, dispatch);
