import { combineReducers } from "redux";
import eventsReducer from "../reducer/events/events.reducer.js";

const rootReducer = combineReducers({
  eventsReducer,
});

export default rootReducer;
