// components/TodoApp.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Task from "./Task";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
import { v4 as uuidv4 } from "uuid";

export default function TodoApp() {
  const data = typeof window !== "undefined" ? localStorage.getItem("tasks") : null;
  const [theme, setTheme] = useState("light"); //light-dark
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All"); //All-Active-Completed
  const [tasks, setTasks] = useState(data ? JSON.parse(data) : []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => task.state === "Active");
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleState = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          state: task.state === "Active" ? "Completed" : "Active",
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (text !== "") {
        setTasks([
          ...tasks,
          {
            id: uuidv4(),
            state: "Active",
            text,
          },
        ]);
        setText("");
      }
    }
  };

  return (
    <main className={`bg-bg-desktop-dark w-full h-[90vh] overflow-scroll bg-gray-900 min-h-screen bg-no-repeat  flex justify-center`}>
      {/* <div className="flex flex-col w-full sm:w-2/3 md:w-3/4 lg:w-4/5 xl:w-1/2 p-10 sm:p-20"> */}
      <div className="flex flex-col w-full p-8 sm:p-6 sm:py-8">
        {/* <a href="https://markrosario.vercel.app/" target="_blank" className={`text-white text-sm absolute bottom-0 right-0 p-2`}>
          Made with ❤️ by Mark Rosario
        </a> */}
        {/* HEADER */}
        <div className="flex items-center justify-between w-full">
          {/* <div className="tracking-[0.4em] text-4xl text-white font-bold">TODO</div> */}
          <div className={` tracking-[0.2em] text-4xl text-white font-bold`}>TODO</div>
          <button onClick={toggleTheme}>
            <Image
              className={`${theme === "light" ? "fill-svgBlack" : "fill-svgWhite"} cursor-pointer`}
              src={theme === "light" ? moon : sun}
              alt="My SVG"
              width={25}
              height={25}
            />
          </button>
        </div>
        {/* INPUT */}
        <div className={`bg-gray-800 flex text-base font-medium rounded-md mt-6 py-2 px-2 items-center gap-1`}>
          <div className={`border-gray-600 rounded-full border-[1px] w-4 h-4 shrink-0`}></div>
          <input
            type="text"
            name="todo"
            id="todo"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className={`text-white outline-none w-full bg-transparent`}
            placeholder="Create a new todo..."
            onKeyDown={handleKeyPress}
          />
        </div>
        {/* LIST */}
        <div className={`bg-gray-800 shadow-gray-900 flex-col mt-5 rounded-md text-lg shadow-sm `}>
          {/* Todos */}
          {tasks
            .filter((task) => task.state === filter || filter === "All")
            .map((task, i) => (
              <Task key={task.id} theme={theme} task={task} toggleState={toggleState} handleDeleteTask={handleDeleteTask} />
            ))}
          {/* Status Bar */}
          <div className={`text-gray-500 flex justify-between items-center rounded-b-md text-xs py-2 px-4 `}>
            <div className="font-semibold w-1/3 text-left">{tasks.filter((task) => task.state === "Active").length} items left</div>
            <div className="hidden lg:flex gap-3 font-bold w-1/3 text-center ">
              {["All", "Active", "Completed"].map((text, i) =>
                theme === "light" ? (
                  <button
                    key={i}
                    className={`${filter === text ? "text-blue-800" : "text-gray-500 hover:text-black"}`}
                    onClick={() => {
                      setFilter(text);
                    }}
                  >
                    {text}
                  </button>
                ) : (
                  <button
                    key={i}
                    className={`${filter === text ? "text-blue-600" : "text-gray-500 hover:text-white"}`}
                    onClick={() => {
                      setFilter(text);
                    }}
                  >
                    {text}
                  </button>
                )
              )}
            </div>
            <div className=" w-1/3 text-right">
              <button className={` hover:text-black font-semibold`} onClick={handleClearCompleted}>
                Clear Completed
              </button>
            </div>
          </div>
        </div>
        {/* MOBILE FILTER */}
        <div className={`bg-gray-800 shadow-gray-900 flex mt-3 gap-3 justify-center rounded-md shadow-sm py-2 px-4 visible lg:hidden`}>
          {["All", "Active", "Completed"].map((text, i) =>
            theme === "light" ? (
              <button
                key={i}
                className={`${filter === text ? "text-blue-800" : "text-gray-500 hover:text-black"}`}
                onClick={() => {
                  setFilter(text);
                }}
              >
                {text}
              </button>
            ) : (
              <button
                key={i}
                className={`${filter === text ? "text-blue-600" : "text-gray-500 hover:text-white"}`}
                onClick={() => {
                  setFilter(text);
                }}
              >
                {text}
              </button>
            )
          )}
        </div>
        <div className={`text-gray-500 text-center text-sm py-10`}>Drag and drop to reorder list</div>
      </div>
    </main>
  );
}
