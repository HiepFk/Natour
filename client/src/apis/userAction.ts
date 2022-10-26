import { Action, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {
  GetMyOrderStart,
  GetMyOrderError,
  GetMyOrderSucess,
  GetMyReviewStart,
  GetMyReviewError,
  GetMyReviewSucess,
} from "../redux/actionSlice";
import { SetAlert } from "../redux/alertSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const ByTour = async (
  data: any,
  dispatch: Dispatch<Action<unknown>>,
  axiosJWT: any,
  accessToken: string | undefined
) => {
  try {
    const res = await axiosJWT.post(`${link}/v1/order/user`, data, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(SetAlert(res.data));
  } catch (error: any) {
    dispatch(SetAlert(error?.response?.data));
  }
};

export const createReivew = async (
  data: any,
  dispatch: Dispatch<Action<unknown>>,
  axiosJWT: any,
  accessToken: string | undefined
) => {
  try {
    const res = await axiosJWT.post(`${link}/v1/review/user`, data, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(SetAlert(res.data));
  } catch (error: any) {
    dispatch(SetAlert(error?.response?.data));
  }
};

export const getMyOrder = async (
  dispatch: Dispatch<Action<unknown>>,
  axiosJWT: any,
  accessToken: string | undefined
) => {
  dispatch(GetMyOrderStart());
  try {
    const res = await axiosJWT.get(`${link}/v1/order/myorder`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetMyOrderSucess(res.data?.order));
  } catch (error) {
    dispatch(GetMyOrderError());
  }
};
export const getMyReview = async (
  dispatch: Dispatch<Action<unknown>>,
  axiosJWT: any,
  accessToken: string | undefined
) => {
  dispatch(GetMyReviewStart());
  try {
    const res = await axiosJWT.get(`${link}/v1/review/myreview`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetMyReviewSucess(res.data?.reviews));
  } catch (error) {
    dispatch(GetMyReviewError());
  }
};
