import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logOutUser } from "../apis/authApi";
export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All Tours{" "}
        </Link>
      </nav>
      <div className="header__logo">
        <img src="/assets/logo-white.png" alt="" />
      </div>
      <nav className="nav nav--user">
        {user ? (
          <>
            <Link
              to="/"
              className="nav__el nav__el--logout"
              onClick={() => logOutUser(dispatch)}
            >
              Logout
            </Link>
            <Link to="/me">
              <img src={user.photo} alt="" className="nav__user-img" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav__el">
              Login
            </Link>
            <Link to="/signup" className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
