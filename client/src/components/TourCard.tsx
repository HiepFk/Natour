import React from "react";
import { Link } from "react-router-dom";
import { Tour } from "../models/TourModel";
interface TourType {
  tour: Tour;
}

export default function TourCard({ tour }: TourType) {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img src={tour.imageCover} alt="" className="card__picture-img" />
        </div>
        <h3 className="heading-tertirary">
          <span>{tour.name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">{`${tour.difficulty} ${tour.duration}-day tour `}</h4>
        <p className="card__text">{tour.summary}</p>

        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="/assets/icons.svg#icon-map-pin" />
          </svg>
          <span>{tour.startLocation.description}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="/assets/icons.svg#icon-calendar" />
          </svg>
          <span>
            {/* {tour.startDates[0].toLocaleString("en-us", {
              month: "long",
              year: "numeric",
            })} */}
            12/5/2022
          </span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="/assets/icons.svg#icon-flag" />
          </svg>
          <span>{tour.locations.length} stops</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="/assets/icons.svg#icon-user" />
          </svg>
          <span>{tour.maxGroupSize}</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${tour.price} </span>
          <span className="card__footer-text"> per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">
            {tour.ratingsAverage > 0 ? tour.ratingsAverage : "4.2 "}{" "}
          </span>
          <span className="card__footer-text">
            Rating ({tour.ratingsQuantity})
          </span>
        </p>
        <Link className="btn btn--green btn--small" to={`/tour/${tour.slug}`}>
          Detail
        </Link>
      </div>
    </div>
  );
}
