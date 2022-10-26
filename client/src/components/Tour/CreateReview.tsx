import React, { useState } from "react";
import { createAxios } from "../../apis/createInstance";
import { createReivew } from "../../apis/userAction";
import { LoginSuccess } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
interface IType {
  _id: string | undefined;
}
export default function CreateReview({ _id }: IType) {
  const arr: number[] = [1, 2, 3, 4, 5];
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  let axiosJWT = createAxios(user, dispatch, LoginSuccess);

  const [rating, setRating] = useState<number>(4);
  const [review, setReview] = useState<string>("");

  const handeCreatReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      tour: _id,
      rating,
      review,
    };
    createReivew(data, dispatch, axiosJWT, user?.accessToken);
  };

  return (
    <section className="section-reviews">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create a Review</h2>
        <form
          action=""
          className="form form--login"
          onSubmit={handeCreatReview}
        >
          <div className="form__group">
            <label htmlFor="" className="form__label">
              Rating
            </label>
            <div className="reviews__rating" style={{ cursor: "pointer" }}>
              {arr.map((item) => {
                return (
                  <svg
                    className={`reviews__star reviews__star--${
                      rating >= item ? "active" : "inactive"
                    } `}
                    key={item}
                    onMouseEnter={() => setRating(item)}
                    style={{ width: "2.5rem" }}
                  >
                    <use xlinkHref={`/assets/icons.svg#icon-star`} />
                  </svg>
                );
              })}
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="" className="form__label">
              Review
            </label>
            <textarea
              className="form__input"
              required
              minLength={10}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}
