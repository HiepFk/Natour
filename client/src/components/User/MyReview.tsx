import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getMyReview } from "../../apis/userAction";
import { LoginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../apis/createInstance";
import Loading from "../Loading";
import { Link } from "react-router-dom";
export default function MyReview() {
  const arr: number[] = [1, 2, 3, 4, 5];

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { reviews, loading } = useAppSelector((state) => state.action);
  let axiosJWT = createAxios(user, dispatch, LoginSuccess);

  useEffect(() => {
    getMyReview(dispatch, axiosJWT, user?.accessToken);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (!reviews || reviews?.length === 0) {
    return (
      <div style={{ padding: "0rem 5rem" }}>
        <h2 className="heading-secondary ma-bt-md">You never review before</h2>
      </div>
    );
  }
  return (
    <div style={{ padding: "0rem 5rem" }}>
      <h2 className="heading-secondary ma-bt-md">Your Review</h2>
      <div className="card-container">
        {reviews?.map((review) => {
          return (
            <div className="card" key={review?._id}>
              <div className="card__header">
                <div className="card__picture">
                  <div className="card__picture-overlay">&nbsp;</div>
                  <img
                    src={review?.tour.imageCover}
                    alt=""
                    className="card__picture-img"
                  />
                </div>
                <h3 className="heading-tertirary">
                  <span>{review?.tour.name}</span>
                </h3>
              </div>

              <div className="reviews__card">
                <p className="reviews__text">{review?.review}</p>
                <div className="reviews__rating">
                  {arr.map((itemMini) => {
                    return (
                      <svg
                        className={`reviews__star reviews__star--${
                          review?.rating >= itemMini ? "active" : "inactive"
                        } `}
                        key={itemMini}
                      >
                        <use xlinkHref={`/assets/icons.svg#icon-star`} />
                      </svg>
                    );
                  })}
                </div>
              </div>

              <div className="card__footer">
                <p>
                  <span className="card__footer-value">
                    ${review?.tour?.price}{" "}
                  </span>
                  <span className="card__footer-text"> per person</span>
                </p>
                <p className="card__ratings">
                  <span className="card__footer-value">
                    {review?.tour.ratingsAverage > 0
                      ? review?.tour.ratingsAverage
                      : "4.2 "}{" "}
                  </span>
                  <span className="card__footer-text">
                    Rating ({review?.tour.ratingsQuantity})
                  </span>
                </p>
                <Link
                  className="btn btn--green btn--small"
                  to={`/tour/${review?.tour.slug}`}
                >
                  Detail
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
