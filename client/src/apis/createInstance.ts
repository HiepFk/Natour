import {AnyAction, Dispatch, EmptyObject, ThunkDispatch} from "@reduxjs/toolkit";
import axios, {AxiosRequestConfig} from "axios";
import jwt_decode from "jwt-decode";
import { SetAlert } from "../redux/alertSlice";
const link = process.env.REACT_APP_API_LINK;

const refreshToken = async (  dispatch: ThunkDispatch<EmptyObject , undefined, AnyAction> & Dispatch<AnyAction>,
) => {
  try {
    const res = await axios.post(`${link}/v1/user/refresh`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    // @ts-ignore
    dispatch(SetAlert(err?.response?.data));
  }
};

export const createAxios = (
  user: any,
  dispatch: ThunkDispatch<EmptyObject , undefined, AnyAction> & Dispatch<AnyAction>,
  stateSuccess: any
) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config:AxiosRequestConfig) => {
      let date = new Date();

      const decodedToken: any = jwt_decode(user.accessToken);

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken(dispatch);

        const refreshUser = {
          ...user,
          accessToken: data?.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        // @ts-ignore
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
