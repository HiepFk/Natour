import React, { useEffect } from "react";
import TourCard from "../components/TourCard";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getAllTour } from "../apis/tourApi";
import { Tour } from "../models/TourModel";
import Loading from "../components/Loading";

export default function TourList() {
  const { tours, loading } = useAppSelector((state) => state.tour);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllTour(dispatch);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="main">
      <div className="card-container">
        {tours?.map((item: Tour) => {
          return <TourCard tour={item} key={item._id} />;
        })}
      </div>
    </main>
  );
}
