import { EventActionTypes } from "./events.types.js";
const INITIAL_STATE = {
  data: null,
  selectedTabData: [],
  selectedTabKey: 0,
};

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventActionTypes.SET_EVENTS:
      return {
        ...state,
        data: action.payload,
      };
    case EventActionTypes.SET_TAB_DATA:
      return {
        ...state,
        selectedTabData: action.payload,
      };
    case EventActionTypes.SET_TAB_KEY:
      return {
        ...state,
        selectedTabKey: action.payload,
      };
    default:
      return state;
  }
};
export default eventsReducer;
