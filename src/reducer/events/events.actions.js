import { EventActionTypes } from "./events.types";

export const setEventTypes = (events) => ({
  type: EventActionTypes.SET_EVENTS,
  payload: events,
});
export const setTabData = (selectedtTabData) => ({
  type: EventActionTypes.SET_TAB_DATA,
  payload: selectedtTabData,
});
export const setTabKey = (selectedTabKey) => ({
  type: EventActionTypes.SET_TAB_KEY,
  payload: selectedTabKey,
});
export const setLanguage = (language) => ({
  type: EventActionTypes.SET_LANGUAGE,
  payload: language,
});
