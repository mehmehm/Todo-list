// components/TaskList.jsx
import React from "react";
import "./TaskList.css";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete }){
  if(!tasks.length) return <p className="tl__empty">No tasks yet — add one above.</p>;
  return (
    <ul className="tl">
      {tasks.map(t=>(
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
