import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../apis/authApi";
import { useAppDispatch } from "../../redux/store";

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activation_token } = useParams();

  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      activation_token,
      password,
      passwordConfirm,
    };
    resetPassword(data, dispatch, navigate);
  };
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Update Password</h2>
        <form
          action=""
          className="form forn--login"
          onSubmit={handleResetPassword}
        >
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              New Password
            </label>
            <input
              type="password"
              className="form__input"
              placeholder="you@example.com"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Password Confirm
            </label>
            <input
              type="password"
              className="form__input"
              placeholder="you@example.com"
              required
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            />
          </div>

          <div className="form__group">
            <button className="btn btn--green btn--save-password" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
