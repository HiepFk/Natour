import React from "react";
import { Tour } from "../../models/TourModel";
interface TourType {
  tour: Tour | null;
}
export default function Header({ tour }: TourType) {
  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>
        <img src={tour?.imageCover} alt="" className="header__hero-img" />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{tour?.name}</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref="/assets/icons.svg#icon-clock" />
            </svg>
            <span className="heading-box__text">{tour?.duration} days</span>
          </div>
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref="/assets/icons.svg#icon-map-pin" />
            </svg>
            <span className="heading-box__text">
              {tour?.startLocation?.description}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
