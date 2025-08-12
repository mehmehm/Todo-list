// components/Heading.jsx
import React from "react";
import "./Heading.css";

export default function Heading({ title="TODO-LIST", subtitle }){
  return (
    <div className="heading">
      <h1 className="heading__title">{title}</h1>
      {subtitle && <div className="heading__sub">{subtitle}</div>}
    </div>
  );
}
