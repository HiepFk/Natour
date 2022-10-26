import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getTour } from "../apis/tourApi";
import Loading from "../components/Loading";
import {
  Header,
  Description,
  Pictures,
  Reviews,
  Footer,
  MapBox,
  CreateReview,
  // Map,
} from "../components/Tour";
export default function Tour() {
  const { tour, loading } = useAppSelector((state) => state.tour);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    getTour(dispatch, id);
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header tour={tour} />
      <Description tour={tour} />
      <Pictures images={tour?.images} />
      <MapBox locations={tour?.locations} />
      {tour?.reviews?.[0] && <Reviews reviews={tour?.reviews} />}
      {/* <Map locations={tour?.locations} /> */}
      {user && <CreateReview _id={tour?._id} />}
      <Footer
        images={tour?.images}
        price={tour?.price}
        duration={tour?.duration}
        _id={tour?._id}
      />
    </div>
  );
}
