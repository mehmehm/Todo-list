// components/TaskForm.jsx
import React, { useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ onAdd }){
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, desc);
    setTitle(""); setDesc("");
  };

  return (
    <form className="tf" onSubmit={submit}>
      <label className="tf__field">
        <span className="tf__label">Name</span>
        <input className="px-input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Buy groceries" />
      </label>
      <label className="tf__field tf__field--wide">
        <span className="tf__label">Description</span>
        <input className="px-input" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="e.g. Milk, eggs, bread" />
      </label>
      <button className="px-btn" type="submit">Add</button>
    </form>
  );
}
