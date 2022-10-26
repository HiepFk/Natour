import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tour } from "../models/TourModel";

interface TourState {
  tour: Tour | null;
  tours: Tour[];
  loading: boolean;
  error: boolean;
}

const initialState: TourState = {
  tour: null,
  tours: [],
  loading: false,
  error: false,
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    GetListTourStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    GetListTourError: (state) => {
      return { ...state, loading: false, error: true };
    },
    GetListTourSucess: (state, action: PayloadAction<Tour[]>) => {
      return {
        ...state,
        error: false,
        loading: false,
        tours: action.payload,
      };
    },
    GetTourStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    GetTourError: (state) => {
      return { ...state, loading: false, error: true };
    },
    GetTourSucess: (state, action: PayloadAction<Tour>) => {
      return {
        ...state,
        error: false,
        loading: false,
        tour: action.payload,
      };
    },
  },
});

export const {
  GetListTourStart,
  GetListTourError,
  GetListTourSucess,
  GetTourStart,
  GetTourError,
  GetTourSucess,
} = tourSlice.actions;
export default tourSlice.reducer;
