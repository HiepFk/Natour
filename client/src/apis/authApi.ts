import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import {
  LoginStart,
  LoginFailed,
  LoginSuccess,
  SignUpStart,
  SignUpFailed,
  SignUpSuccess,
  LogOutStart,
  LogOutSuccess,
  LogOutFailed,
  GetMeStart,
  GetMeError,
  GetMeSuccess,
} from "../redux/authSlice";
import { SetAlert } from "../redux/alertSlice";
import { Action, Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const signInWithGoogle = async (
  dispatch: Dispatch<Action<unknown>>,
  navigate: any
) => {
  dispatch(LoginStart());
  signInWithPopup(auth, provider)
    .then((result) => {
      axios
        .post(`${link}/v1/user/sign-google`, {
          name: result.user.displayName,
          email: result.user.email,
        })
        .then((res) => {
          dispatch(LoginSuccess(res.data));
          dispatch(SetAlert(res.data));
          navigate("/");
        });
    })
    .catch((error) => {
      dispatch(LoginFailed());
      dispatch(SetAlert(error?.response?.data));
    });
};

export const signUp = async (
  user: any,
  dispatch: Dispatch<Action<unknown>>,
  navigate: any
) => {
  dispatch(SignUpStart());
  try {
    const res = await axios.post(`${link}/v1/user/signup`, user);
    dispatch(SetAlert(res.data));
  } catch (error: any) {
    dispatch(SignUpFailed());
    dispatch(SetAlert(error?.response?.data));
  }
};

export const activeEmail = async (
  activation_token: string,
  dispatch: Dispatch<Action<unknown>>,
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post(`${link}/v1/user/activation`, {
      activation_token,
    });
    dispatch(SignUpSuccess(res.data));
    dispatch(SetAlert(res.data));
    navigate("/");
  } catch (error: any) {
    dispatch(SetAlert(error?.response?.data));
  }
};
export const loginUser = async (
  user: any,
  dispatch: Dispatch<Action<unknown>>,
  navigate: any
) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(`${link}/v1/user/login`, user);
    dispatch(LoginSuccess(res.data));
    dispatch(SetAlert(res.data));
    navigate("/");
  } catch (error: any) {
    dispatch(LoginFailed());
    dispatch(SetAlert(error?.response?.data));
  }
};

export const logOutUser = async (dispatch: Dispatch<Action<unknown>>) => {
  dispatch(LogOutStart());
  try {
    const res = await axios.get(`${link}/v1/user/logout`);
    dispatch(LogOutSuccess());
    dispatch(SetAlert(res.data));
  } catch (error) {
    dispatch(LogOutFailed());
  }
};

export const GetMe = async (
  dispatch: Dispatch<Action<unknown>>,
  axiosJWT: any,
  accessToken: string | undefined
) => {
  dispatch(GetMeStart());
  try {
    await axiosJWT.get(`${link}/v1/user/me`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    // dispatch(GetMeSuccess(res.data));
  } catch (error) {
    dispatch(GetMeError());
  }
};

export const UpdateMe = async (
  dispatch: Dispatch<Action<unknown>>,
  data: any,
  type: string,
  axiosJWT: any,
  accessToken: string | undefined
) => {
  dispatch(GetMeStart());
  try {
    const url =
      type === "password"
        ? `${link}/v1/user/updateMyPassword`
        : `${link}/v1/user/updateInfo`;

    const res = await axiosJWT({
      method: "PATCH",
      url,
      data,
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(GetMeSuccess(res.data));
    dispatch(SetAlert(res.data));
  } catch (error: any) {
    dispatch(GetMeError());
    dispatch(SetAlert(error?.response?.data));
  }
};

export const forgotPassword = async (
  email: string,
  dispatch: Dispatch<Action<unknown>>
) => {
  try {
    const res = await axios.post(`${link}/v1/user/forgot`, { email });
    dispatch(SetAlert(res.data));
  } catch (error: any) {
    dispatch(SetAlert(error?.response?.data));
  }
};

export const resetPassword = async (
  data: any,
  dispatch: Dispatch<Action<unknown>>,
  navigate: any
) => {
  try {
    const res = await axios.post(`${link}/v1/user/reset`, data);
    dispatch(SignUpSuccess(res.data));
    dispatch(SetAlert(res.data));
    navigate("/");
  } catch (error: any) {
    dispatch(SetAlert(error?.response?.data));
  }
};
