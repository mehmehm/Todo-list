// components/TaskItem.jsx
import React from "react";
import "./TaskItem.css";

export default function TaskItem({ task, onToggle, onDelete }){
  return (
    <li className={`ti ${task.completed ? "is-done" : ""}`}>
      <div className="ti__text">
        <div className="ti__title">{task.title}</div>
        {task.description && <div className="ti__desc">{task.description}</div>}
      </div>
      <div className="ti__actions">
        <button className="px-btn ti__btn" onClick={()=>onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button className="px-btn ti__btn ti__btn--danger" onClick={()=>onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
