import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { UpdateMe } from "../../apis/authApi";
import { createAxios } from "../../apis/createInstance";
import { LoginSuccess } from "../../redux/authSlice";

interface FormState {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}
const state: FormState = {
  passwordCurrent: "",
  password: "",
  passwordConfirm: "",
};

export default function Password() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [form, setForm] = useState<FormState>(state);

  let axiosJWT = createAxios(user, dispatch, LoginSuccess);

  const handeUpdatePassWord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = form;
    UpdateMe(dispatch, data, "info", axiosJWT, user?.accessToken);
    setForm(state);
  };
  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>
      <form
        action=""
        className="form form-user-password"
        onSubmit={handeUpdatePassWord}
      >
        <div className="form__group">
          <label htmlFor="password-current" className="form__label">
            Current password
          </label>
          <input
            type="password"
            className="form__input"
            placeholder="••••••••"
            id="password-current"
            minLength={8}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                passwordCurrent: event.target.value,
              }))
            }
          />
        </div>
        <div className="form__group ">
          <label htmlFor="password" className="form__label">
            New password
          </label>
          <input
            type="password"
            className="form__input"
            placeholder="••••••••"
            id="password"
            minLength={8}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, password: event.target.value }))
            }
          />
        </div>
        <div className="form__group ma-bt-lg">
          <label htmlFor="password-confirm" className="form__label">
            Confirm password
          </label>
          <input
            type="password"
            className="form__input"
            placeholder="••••••••"
            id="password-confirm"
            minLength={8}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                passwordConfirm: event.target.value,
              }))
            }
          />
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green">Save password</button>
        </div>
      </form>
    </div>
  );
}
