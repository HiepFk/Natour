import axios, { AxiosInstance } from "axios";
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
import {
  AnyAction,
  Dispatch,
  EmptyObject,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

axios.defaults.withCredentials = true;
const link = process.env.REACT_APP_API_LINK;

export const signInWithGoogle = async (
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
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
  user: {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
  },
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>
) => {
  dispatch(SignUpStart());
  try {
    const res = await axios.post(`${link}/v1/user/signup`, user);
    dispatch(SetAlert(res.data));
  } catch (error) {
    dispatch(SignUpFailed());
    // @ts-ignore
    dispatch(SetAlert(error?.response?.data));
  }
};

export const activeEmail = async (
  activation_token: string,
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post(`${link}/v1/user/activation`, {
      activation_token,
    });
    dispatch(SignUpSuccess(res.data));
    dispatch(SetAlert(res.data));
    navigate("/");
  } catch (error) {
    // @ts-ignore
    dispatch(SetAlert(error?.response?.data));
  }
};
export const loginUser = async (
  user: { email: string; password: string },
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(`${link}/v1/user/login`, user);
    dispatch(LoginSuccess(res.data));
    dispatch(SetAlert(res.data));
    navigate("/");
  } catch (error) {
    dispatch(LoginFailed());
    // @ts-ignore
    dispatch(SetAlert(error?.response?.data));
  }
};

export const logOutUser = async (
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>
) => {
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
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>,
  axiosJWT: AxiosInstance,
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
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>,
  data: any,
  type: string,
  axiosJWT: AxiosInstance,
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
  } catch (error) {
    dispatch(GetMeError());
    // @ts-ignore
    dispatch(SetAlert(error?.response?.data));
  }
};

export const forgotPassword = async (
  email: string,
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>
) => {
  try {
    const res = await axios.post(`${link}/v1/user/forgot`, { email });
    dispatch(SetAlert(res.data));
  } catch (error) {
    // @ts-ignore
    dispatch(SetAlert(error?.response?.data));
  }
};

export const resetPassword = async (
  data: {
    activation_token: string | undefined;
    password: string;
    passwordConfirm: string;
  },
  dispatch: ThunkDispatch<EmptyObject, undefined, AnyAction> &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
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
