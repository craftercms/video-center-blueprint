import { combineReducers } from "redux"

import nav from "./navigationReducer";
import video from "./videoPlayerReducer";
// import user from "./userReducer"

export default combineReducers({
  nav,
  video
})
