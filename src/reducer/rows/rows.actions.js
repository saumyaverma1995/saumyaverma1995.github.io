import { RowActionTypes } from "./rows.types";

export const setRowData = (row) => ({
  type: RowActionTypes.SET_ROW,
  payload: row,
});
