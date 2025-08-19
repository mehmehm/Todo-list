// components/PixelWindow.jsx
import React from "react";
import "./PixelWindow.css";

export default function PixelWindow({
  children,
  titleBar,
  width = "60%",            
}) {
  // allow numbers (px) or strings
  const w = typeof width === "number" ? `${width}px` : width;

  return (
    <div className="pixel-window-wrap">
      <div className="pixel-window" style={{ width: w }}>
        <div className="pixel-titlebar">
          {titleBar}
        </div>
        <div className="pixel-inner">{children}</div>
      </div>
    </div>
  );
}
