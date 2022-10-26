import React from "react";
import { Review } from "../../models/ReviewModel";
interface ReviewType {
  reviews: Review[] | undefined;
}
export default function Reviews({ reviews }: ReviewType) {
  const arr: number[] = [1, 2, 3, 4, 5];
  return (
    <section className="section-reviews">
      <div className="reviews">
        {reviews?.map((item) => {
          console.log(item?.user);

          return (
            <div className="reviews__card" key={item?._id}>
              <div className="reviews__avatar">
                <img
                  src={item?.user?.photo}
                  alt=""
                  className="reviews__avatar-img"
                />
                <h6 className="reviews__user">{item?.user?.name}</h6>
              </div>
              <p className="reviews__text">{item?.review}</p>
              <div className="reviews__rating">
                {arr.map((itemMini) => {
                  return (
                    <svg
                      className={`reviews__star reviews__star--${
                        item?.rating >= itemMini ? "active" : "inactive"
                      } `}
                      key={itemMini}
                    >
                      <use xlinkHref={`/assets/icons.svg#icon-star`} />
                    </svg>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
