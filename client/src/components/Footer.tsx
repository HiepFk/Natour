import React from "react";
import { Link } from "react-router-dom";

interface Arr {
  id: string;
  title: string;
}
export default function Footer() {
  const arr: Arr[] = [
    {
      id: "1",
      title: "About us",
    },
    {
      id: "2",
      title: "Download apps",
    },
    {
      id: "3",
      title: "Become a guide ",
    },
    {
      id: "4",
      title: "Careers",
    },
    {
      id: "5",
      title: "Contact",
    },
  ];
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/assets/logo-green.png" alt="" />
      </div>
      <ul className="footer__nav">
        {arr.map((item) => {
          return (
            <li key={item.id} className="">
              <Link to={"/"}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <p className="footer__copyright">
        &copy; by Jonas Schmedtmann & FK . All rights reserved.
      </p>
    </footer>
  );
}
