import { combineReducers } from "redux"

import nav from "./navigationReducer";
import video from "./videoPlayerReducer";

export default combineReducers({
  nav,
  video
})
