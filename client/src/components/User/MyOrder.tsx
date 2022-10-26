import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getMyOrder } from "../../apis/userAction";
import { LoginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../apis/createInstance";
import Loading from "../Loading";
import TourCard from "../TourCard";

export default function MyOrder() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { orders, loading } = useAppSelector((state) => state.action);
  let axiosJWT = createAxios(user, dispatch, LoginSuccess);

  useEffect(() => {
    getMyOrder(dispatch, axiosJWT, user?.accessToken);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!orders || orders?.length === 0) {
    return (
      <div style={{ padding: "0rem 5rem" }}>
        <h2 className="heading-secondary ma-bt-md">You never order before</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "0rem 5rem" }}>
      <h2 className="heading-secondary ma-bt-md">Your Order</h2>
      <div className="card-container">
        {orders?.map((order) => {
          return (
            <div key={order._id}>
              <TourCard tour={order?.tour} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
