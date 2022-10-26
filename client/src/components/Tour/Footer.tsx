import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { ByTour } from "../../apis/userAction";
import { createAxios } from "../../apis/createInstance";
import { LoginSuccess } from "../../redux/authSlice";
interface ImagesType {
  images: string[] | undefined;
  price: number | undefined;
  duration: number | undefined;
  _id: string | undefined;
}
function Footer({ images, price, _id, duration }: ImagesType) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  let axiosJWT = createAxios(user, dispatch, LoginSuccess);

  const handeByTour = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      tour: _id,
      user: user?._id,
      price,
    };
    ByTour(data, dispatch, axiosJWT, user?.accessToken);
  };
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src="/assets/logo-white.png" alt="" />
        </div>
        <img src={images?.[1]} alt="" className="cta__img cta__img--1" />
        <img src={images?.[2]} alt="" className="cta__img cta__img--2" />
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            {duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>
          {user ? (
            <button
              className="btn btn--green span-all-rows"
              onClick={handeByTour}
            >
              Book tour now
            </button>
          ) : (
            <Link className="btn btn--green span-all-rows" to="/login">
              Login to book
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default Footer;
