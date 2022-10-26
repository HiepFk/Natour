import React, { useState } from "react";
import { forgotPassword } from "../../apis/authApi";
import { useAppDispatch } from "../../redux/store";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const handeSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(email, dispatch);
  };
  return (
    <main className="main">
      <div className="login-form" style={{ marginBottom: "10vh" }}>
        <h2 className="heading-secondary ma-bt-lg">enter your email</h2>
        <form action="" className="form forn--login" onSubmit={handeSendEmail}>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              type="email"
              className="form__input"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form__group">
            <button className="btn btn--green btn--save-password" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
