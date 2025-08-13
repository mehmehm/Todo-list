import React, { useState } from "react";
import "./TaskList.css";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, onReorder }) {
  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [overPos, setOverPos] = useState(null); // "before" | "after" | null

  const handleDragStart = (e, id) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOverItem = (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // 🔒 don't let the UL think this is over empty space
    if (id === dragId) { setOverId(null); setOverPos(null); return; }

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const pos = y < rect.height / 2 ? "before" : "after";

    if (id !== overId) setOverId(id);
    if (pos !== overPos) setOverPos(pos);
  };

  const handleDropOnItem = (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // 🔒 prevent UL onDrop firing after this
    if (dragId && id && overPos) onReorder(dragId, id, overPos);
    setDragId(null); setOverId(null); setOverPos(null);
  };

  const handleDragEnd = () => {
    setDragId(null); setOverId(null); setOverPos(null);
  };

  // Only fire when dropping on the UL background (not on an LI)
  const handleListDropEnd = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return; // 🔒 ignore bubbled drops
    if (dragId) onReorder(dragId, null, "end");
    setDragId(null); setOverId(null); setOverPos(null);
  };

  if (!tasks.length) return <p className="tl__empty">No tasks yet — add one above.</p>;

  return (
    <ul
      className={`tl ${dragId ? "tl--dragging" : ""}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleListDropEnd}
    >
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
          draggable
          onDragStart={(e) => handleDragStart(e, t.id)}
          onDragOver={(e) => handleDragOverItem(e, t.id)}
          onDrop={(e) => handleDropOnItem(e, t.id)}
          onDragEnd={handleDragEnd}
          isDragging={dragId === t.id}
          overPos={overId === t.id ? overPos : null}
        />
      ))}
    </ul>
  );
}
