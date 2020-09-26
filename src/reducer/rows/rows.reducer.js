import { EventActionTypes } from "./events.types.js";
const INITIAL_STATE = {
  events: [],
};

const eventsReducer = (state = INITIAL_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
    case EventActionTypes.SET_EVENTS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default eventsReducer;
