import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { signUp } from "../apis/authApi";

interface Form {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
const state: Form = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};
export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [form, setForm] = useState<Form>(state);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp(form, dispatch);
    setForm(state);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Sign up new account</h2>
        <form action="" className="form forn--login" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              name
            </label>
            <input
              type="text"
              className="form__input"
              placeholder="your name"
              required
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              type="email"
              className="form__input"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength={8}
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password Confirm
            </label>
            <input
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength={8}
              value={form.passwordConfirm}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  passwordConfirm: event.target.value,
                }))
              }
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green btn--save-password" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
