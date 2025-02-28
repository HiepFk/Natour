import {AnyAction, Dispatch, EmptyObject, ThunkDispatch} from "@reduxjs/toolkit";
import axios from "axios";
import {
  GetListTourStart,
  GetListTourError,
  GetListTourSucess,
  GetTourStart,
  GetTourError,
  GetTourSucess,
} from "../redux/tourSlice";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const getAllTour = async (dispatch: ThunkDispatch<EmptyObject , undefined, AnyAction> & Dispatch<AnyAction>) => {
  dispatch(GetListTourStart());
  try {
    const res = await axios.get(`${link}/v1/tour/`);
    dispatch(GetListTourSucess(res.data?.data));
  } catch (error) {
    dispatch(GetListTourError());
  }
};

export const getTour = async (
  dispatch: ThunkDispatch<EmptyObject , undefined, AnyAction> & Dispatch<AnyAction>,
  id: string | undefined
) => {
  dispatch(GetTourStart());
  try {
    const res = await axios.get(`${link}/v1/tour/${id}`);
    dispatch(GetTourSucess(res.data?.data));
  } catch (error) {
    dispatch(GetTourError());
  }
};
