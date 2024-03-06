import { combineReducers } from "redux";
import tokenReducer from "../reducers/tokenReducer";

const rootReducer = combineReducers({
  tokenReducer,
});

export default rootReducer;