import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Background from "./components/Background";
import PixelWindow from "./components/PixelWindow";
import Heading from "./components/Heading";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App(){
  const [tasks, setTasks] = useState(()=> {
    try{ return JSON.parse(localStorage.getItem("todos-v1")) || []; }
    catch{ return []; }
  });
  useEffect(()=>localStorage.setItem("todos-v1", JSON.stringify(tasks)),[tasks]);

  const addTask = (title, description) => {
    if(!title.trim()) return;
    setTasks(prev=>[
      { id: crypto?.randomUUID?.() ?? Date.now()+Math.random(), title:title.trim(), description:description.trim(), completed:false },
      ...prev
    ]);
  };
  const toggleComplete = id => setTasks(p=>p.map(t=>t.id===id?{...t,completed:!t.completed}:t));
  const deleteTask  = id => setTasks(p=>p.filter(t=>t.id!==id));

  const today = new Date().toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric"});
  const remaining = useMemo(()=>tasks.filter(t=>!t.completed).length,[tasks]);

  return (
    <div>
      <Background />
      <PixelWindow width="clamp(960px, 95vw, 1020px)"
        titleBar={<Heading title="TODO-LIST" subtitle={today} />}>
        <p style={{fontFamily:'"Press Start 2P", monospace', fontSize:12, margin:'0 0 10px', opacity:.7}}>
          {remaining} tasks left
        </p>
        <TaskForm onAdd={addTask}/>
        <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={deleteTask}/>
      </PixelWindow>
    </div>
  );
}
