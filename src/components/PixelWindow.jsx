// components/PixelWindow.jsx
import React from "react";
import "./PixelWindow.css";

export default function PixelWindow({
  children,
  titleBar,
  width = "60%",            // accept %, vw, clamp(), px, etc.
}) {
  // allow numbers (px) or strings
  const w = typeof width === "number" ? `${width}px` : width;

  return (
    <div className="pixel-window-wrap">
      <div className="pixel-window" style={{ width: w }}>
        <div className="pixel-titlebar">
          <div className="title-icons" aria-hidden>
            <span/><span/><span/><span/>
          </div>
          {titleBar}
        </div>
        <div className="pixel-inner">{children}</div>
      </div>
    </div>
  );
}
