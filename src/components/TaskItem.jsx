import React from "react";
import "./TaskItem.css";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  draggable = false,
  onDragStart = () => {},
  onDragOver = () => {},
  onDrop = () => {},
  onDragEnd = () => {},
  isDragging = false,
  overPos = null, // "before" | "after" | null
}) {
  const overClass =
    overPos === "before" ? "ti--over-top" :
    overPos === "after"  ? "ti--over-bottom" : "";

  return (
    <li
      className={`ti ${task.completed ? "is-done" : ""} ${isDragging ? "ti--dragging" : ""} ${overClass}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      aria-grabbed={isDragging || undefined}
    >
      <div className="ti__text">
        <div className="ti__title">{task.title}</div>
        {task.description && <div className="ti__desc">{task.description}</div>}
      </div>
      <div className="ti__actions">
        <button className="px-btn ti__btn" onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button className="px-btn ti__btn ti__btn--danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
