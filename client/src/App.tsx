import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./components/Error";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  Login,
  SignUp,
  TourList,
  Tour,
  Me,
  ActivationEmail,
  ForgotPassword,
  ResetPassword,
} from "./pages";
import { ClearAlert } from "./redux/alertSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { successAlert, errorAlert } from "./utils/alert";

const App: React.FC = () => {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (alert.status === "success") {
      successAlert(toast, alert?.msg);
    }
    if (alert.status === "error") {
      errorAlert(toast, alert?.msg);
    }
    dispatch(ClearAlert());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert.status, alert.msg]);
  return (
    <div className="">
      <ToastContainer style={{ fontSize: "2rem" }} />
      <Header />
      <Routes>
        <Route path="/" element={<TourList />} />
        <Route path="/tour/:id" element={<Tour />} />
        <Route path="/me/*" element={<Me />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="user/activate/:activation_token"
          element={<ActivationEmail />}
        />
        <Route
          path="user/reset/:activation_token"
          element={<ResetPassword />}
        />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
