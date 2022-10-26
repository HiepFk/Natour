import React from "react";
import { Routes, Route } from "react-router-dom";

import { Menu, MyOrder, MyReview, MyInfo } from "../components/User";
export default function Me() {
  return (
    <main className="main">
      <div className="user-view">
        <Menu />
        <div className="user-view__content">
          <Routes>
            <Route path="" element={<MyInfo />} />
            <Route path="orders" element={<MyOrder />} />
            <Route path="reviews" element={<MyReview />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}
