import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import artsReducer from "./arts.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  arts: artsReducer,
});

export default rootReducer;
