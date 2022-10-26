import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";

import { loginUser } from "../apis/authApi";
import { Link, useNavigate } from "react-router-dom";
interface Form {
  email: string;
  password: string;
}
const state: Form = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>(state);
  const user = useAppSelector((state) => state.auth.user);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(form, dispatch, navigate);
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
        <h2 className="heading-secondary ma-bt-lg">Login your account</h2>
        <form action="" className="form forn--login" onSubmit={handleSubmit}>
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
            <Link to="/forgot" style={{ color: "#ff7730" }}>
              Forgot password? Click here
            </Link>
          </div>
          <div className="form__group">
            <button className="btn btn--green btn--save-password" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
