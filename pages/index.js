import { useState } from 'react';
import DarkMode from '../components/DarkMode';
import Layout from '../components/Layout';
import Pomo from '../components/Pomo';
import TodoApp from '../components/TodoApp';
import PomoDoro from '../components/PomoDoro';
import Navbar from '../components/Navbar';
import Todo from '../components/Todo';
import Head from 'next/head';

export default function Home() {
  const [activeComponent,setActiveComponent]=useState('timer');
  console.log(activeComponent);
  return (
    <div className="flex gap-10 w-screen">
      
      <div className="w-1/2 h-screen">
        <TodoApp />
      </div>
      <div className="w-1/2 h-screen">
        <PomoDoro />
      </div>
      {/* <Navbar activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>
      {activeComponent=='timer'?<TodoApp/>:<PomoDoro/>} */}
    </div>
  );
}
