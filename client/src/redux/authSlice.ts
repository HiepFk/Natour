import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/UserModel";

interface UserState {
  user: User | null;
  loading: boolean;
  error: boolean | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoginStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    LoginFailed: (state) => {
      return { ...state, loading: false, error: true };
    },
    LoginSuccess: (state, action: PayloadAction<User>) => {
      return { ...state, loading: false, error: false, user: action.payload };
    },

    SignUpStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    SignUpFailed: (state) => {
      return { ...state, loading: false, error: true };
    },
    SignUpSuccess: (state, action: PayloadAction<User>) => {
      return { ...state, loading: false, error: false, user: action.payload };
    },

    LogOutSuccess: (state) => {
      return { ...state, loading: false, error: false, user: null };
    },
    LogOutFailed: (state) => {
      return { ...state, loading: false, error: false };
    },
    LogOutStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    GetMeStart: (state) => {
      return { ...state, loading: true, error: false };
    },
    GetMeError: (state) => {
      return { ...state, loading: false, error: false };
    },
    GetMeSuccess: (state, action: PayloadAction<User>) => {
      return { ...state, loading: false, error: false, user: action.payload };
    },
  },
});

export const {
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
} = authSlice.actions;

export default authSlice.reducer;
