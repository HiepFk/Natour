import { Action, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import { User } from "../models/UserModel";
import { logOutUser } from "./authApi";

import { SetAlert } from "../redux/alertSlice";
const link = process.env.REACT_APP_API_LINK;

const refreshToken = async (dispatch: Dispatch<Action<unknown>>) => {
  try {
    const res = await axios.post(`${link}/v1/user/refresh`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    dispatch(SetAlert(err?.response?.data));
  }
};

export const createAxios = (
  user: any,
  dispatch: Dispatch<Action<unknown>>,
  stateSuccess: any
) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config: any) => {
      let date = new Date();

      const decodedToken: any = jwt_decode(user?.accessToken);

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken(dispatch);

        const refreshUser = {
          ...user,
          accessToken: data?.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
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
