import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [active, setActive] = useState<number>(1);
  const list = [
    {
      id: 1,
      title: "Settings",
      url: "",
      icon: "settings",
    },
    {
      id: 2,
      title: "My Orders",
      url: "orders",
      icon: "briefcase",
    },
    {
      id: 3,
      title: "My Reviews",
      url: "reviews",
      icon: "star",
    },
  ];
  return (
    <div className="user-view__menu">
      <ul className="side-nav">
        {list.map((item) => {
          return (
            <li
              className={active === item.id ? "side-nav--active" : ""}
              key={item.id}
              onClick={() => setActive(item.id)}
            >
              <Link to={`/me/${item.url}`}>
                <svg>
                  <use xlinkHref={`/assets/icons.svg#icon-${item.icon}`} />
                </svg>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
