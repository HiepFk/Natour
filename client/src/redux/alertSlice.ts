import { createSlice } from "@reduxjs/toolkit";

interface alertState {
  msg: string;
  status: string;
}
const initialState: alertState = {
  msg: "",
  status: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    SetAlert: (state, action) => {
      return {
        ...state,
        status: action.payload.status,
        msg: action.payload.message,
      };
    },
    ClearAlert: (state) => {
      return {
        ...state,
        status: "",
        msg: "",
      };
    },
  },
});

export const { SetAlert, ClearAlert } = alertSlice.actions;
export default alertSlice.reducer;
