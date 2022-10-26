import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../models/OrderModel";
import { Review } from "../models/ReviewModel";

interface OrderState {
  orders: Order[];
  reviews: Review[];
  loading: boolean;
  error: boolean;
}

const initialState: OrderState = {
  orders: [],
  reviews: [],
  loading: false,
  error: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    GetMyOrderStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    GetMyOrderError: (state) => {
      return { ...state, loading: false, error: true };
    },
    GetMyOrderSucess: (state, action: PayloadAction<Order[]>) => {
      return {
        ...state,
        error: false,
        loading: false,
        orders: action.payload,
      };
    },
    GetMyReviewStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    GetMyReviewError: (state) => {
      return { ...state, loading: false, error: true };
    },
    GetMyReviewSucess: (state, action: PayloadAction<Review[]>) => {
      return {
        ...state,
        error: false,
        loading: false,
        reviews: action.payload,
      };
    },
  },
});

export const {
  GetMyOrderStart,
  GetMyOrderError,
  GetMyOrderSucess,
  GetMyReviewStart,
  GetMyReviewError,
  GetMyReviewSucess,
} = orderSlice.actions;
export default orderSlice.reducer;
