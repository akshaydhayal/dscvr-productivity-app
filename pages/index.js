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
    <div className="flex w-screen">
      <Head>
        <title>My Awesome Next.js App</title>
        <meta name="dscvr:canvas:version" content="vNext"/>
        <meta name="og:image" content="https://my-canvas.com/preview-image.png"/>
      </Head>
      <div className="w-1/2">
        <TodoApp />
      </div>
      <div className="w-1/2">
        <PomoDoro />
      </div>
      {/* <Navbar activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>
      {activeComponent=='timer'?<TodoApp/>:<PomoDoro/>} */}
    </div>
  );
}
