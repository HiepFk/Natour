import React from "react";
import Info from "./Info";
import Password from "./Password";
export default function MyInfo() {
  return (
    <div>
      <Info />
      <div className="line">&nbsp;</div>
      <Password />
    </div>
  );
}
