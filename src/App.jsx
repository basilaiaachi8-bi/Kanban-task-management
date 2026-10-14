import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import ModalManager from "./components/modals/ModalManager";

export default function App() {
  const { theme } = useSelector((state) => state.boards);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-light dark:bg-dark-bg transition-colors duration-300">
      <Header />
      <div className="flex flex-row flex-grow overflow-hidden relative">
        <Sidebar />
        <Board />
      </div>
      <ModalManager />
    </div>
  );
}
