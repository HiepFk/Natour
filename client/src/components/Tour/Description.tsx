import React from "react";
import { Tour } from "../../models/TourModel";
interface TourType {
  tour: Tour | null;
}

const OverviewBox = (
  label: string,
  text: string | number | undefined,
  icon: string
) => {
  return (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`/assets/icons.svg#icon-${icon}`} />
      </svg>
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );
};

export default function Description({ tour }: TourType) {
  const desc = tour?.description.split("\n");
  //   const date = tour?.startDates[0].toLocaleString('en-us', {month : 'long', year : 'numeric'})
  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            {OverviewBox("Next date", "15/22", "calendar")}
            {OverviewBox("Difficulty", tour?.difficulty, "trending-up")}
            {OverviewBox(
              "Participants",
              `${tour?.maxGroupSize} people`,
              "calendar"
            )}
            {OverviewBox("Rating", tour?.ratingsAverage, "star")}
          </div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {tour?.guides?.map((item: any, index) => {
              return (
                <div className="overview-box__detail" key={index}>
                  <img src={item?.photo} alt="" className="overview-box__img" />
                  {item?.role === "lead-guide" && (
                    <span className="overview-box__label">Lead guide</span>
                  )}
                  {item?.role === "guide" && (
                    <span className="overview-box__label">Tour guide</span>
                  )}
                  <span className="overview-box__text">{item?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">About {tour?.name} tour</h2>
        {desc?.map((item, key) => {
          return (
            <p className="description__text" key={key}>
              {item}
            </p>
          );
        })}
      </div>
    </section>
  );
}
