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

  const getCrypto = () => {
  if (typeof window !== "undefined" && window.crypto) return window.crypto; // browser
  if (typeof global !== "undefined" && global.crypto) return global.crypto; // jest/node
  return undefined;
  };

  const makeId = () =>
  getCrypto()?.randomUUID?.() ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  const addTask = (title, description) => {
    if(!title.trim()) return;
    setTasks(prev=>[
      { id: makeId(), title:title.trim(), description:description.trim(), completed:false },
      ...prev
    ]);
  };
  const toggleComplete = id => setTasks(p=>p.map(t=>t.id===id?{...t,completed:!t.completed}:t));
  const deleteTask  = id => setTasks(p=>p.filter(t=>t.id!==id));

  const reorder = (dragId, overId, position = "after") => {
  setTasks(prev => {
    const list = prev.slice();

    // remove dragged item
    const fromIdx = list.findIndex(t => t.id === dragId);
    if (fromIdx === -1) return prev;
    const [moved] = list.splice(fromIdx, 1);

    // drop to start/end if no specific target
    if (!overId) {
      const insertIdx = position === "start" ? 0 : list.length;
      list.splice(insertIdx, 0, moved);
      return list;
    }

    // compute target index AFTER removal
    const overIdx = list.findIndex(t => t.id === overId);
    if (overIdx === -1) return prev;

    const insertIdx = position === "before" ? overIdx : overIdx + 1;
    list.splice(insertIdx, 0, moved);
    return list;
  });
  };

  const today = new Date().toLocaleDateString("en-AU",{day:"2-digit",month:"short",year:"numeric"});
  const remaining = useMemo(()=>tasks.filter(t=>!t.completed).length,[tasks]);

  return (
    <div>
      <Background />
      <PixelWindow width="clamp(960px, 95vw, 1020px)"
        titleBar={<Heading title="TODO-LIST" subtitle={today} />}>
        <p style={{fontFamily:'"Press Start 2P", monospace', fontSize:16, margin:'0 0 15px', opacity:.7, textAlign: "center", alignSelf:'center'}}>
          {remaining} tasks left today! You got this :)
        </p>
        <TaskForm onAdd={addTask}/>
        <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={deleteTask} onReorder={reorder}/>
      </PixelWindow>
    </div>
  );
}
