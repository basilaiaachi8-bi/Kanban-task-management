import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSidebar,
  setActiveBoardIndex,
  setModalState,
  setTheme,
} from "../redux/boardsSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { boards, activeBoardIndex, isSidebarOpen, theme } = useSelector(
    (state) => state.boards,
  );

  if (!isSidebarOpen) {
    return (
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="fixed bottom-8 left-0 bg-primary hover:bg-primary-hover text-white p-4 rounded-r-full flex items-center justify-center transition-colors z-40 group shadow-lg"
        title="Show Sidebar"
      >
        <img
          src="/icon-show-sidebar.svg"
          alt="show sidebar"
          className="w-4 h-4"
        />
      </button>
    );
  }

  return (
    <aside className="w-72 bg-white dark:bg-dark-card border-r border-lines dark:border-dark-line flex flex-col justify-between flex-shrink-0 transition-colors duration-300 h-[calc(100vh-73px)]">
      <div className="py-6 flex flex-col overflow-y-auto">
        <div className="px-6 mb-4">
          <h2 className="text-mediumGray font-bold text-xs tracking-widest uppercase">
            All Boards ({boards.length})
          </h2>
        </div>

        <div className="flex flex-col space-y-1 pr-6">
          {boards.map((board, index) => (
            <button
              key={board.id || index}
              onClick={() => dispatch(setActiveBoardIndex(index))}
              className={`flex items-center space-x-4 px-6 py-3.5 rounded-r-full font-bold text-sm transition-colors text-left ${
                activeBoardIndex === index
                  ? "bg-primary text-white"
                  : "text-mediumGray hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <img
                src="/icon-board.svg"
                alt="board icon"
                className={`w-4 h-4 ${activeBoardIndex === index ? "filter brightness-200" : ""}`}
              />
              <span className="truncate">{board.name}</span>
            </button>
          ))}

          <button
            onClick={() =>
              dispatch(
                setModalState({
                  type: "addBoard",
                  isOpen: true,
                  selectedTask: null,
                }),
              )
            }
            className="flex items-center space-x-4 px-6 py-3.5 rounded-r-full font-bold text-sm text-primary hover:bg-primary/10 transition-colors text-left"
          >
            <img
              src="/icon-board.svg"
              alt="board icon"
              className="w-4 h-4 filter invert brightness-200"
            />
            <span>+ Create New Board</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-light dark:bg-dark-bg flex items-center justify-center space-x-4 py-3 rounded-md transition-colors">
          <img
            src="/icon-light-theme.svg"
            alt="light theme"
            className="w-4 h-4"
          />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={(e) =>
                dispatch(setTheme(e.target.checked ? "dark" : "light"))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          <img
            src="/icon-dark-theme.svg"
            alt="dark theme"
            className="w-4 h-4"
          />
        </div>

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="flex items-center space-x-4 text-mediumGray hover:text-black dark:hover:text-white font-bold text-sm w-full py-2 transition-colors"
        >
          <img
            src="/icon-hide-sidebar.svg"
            alt="hide sidebar"
            className="w-4 h-4"
          />
          <span>Hide Sidebar</span>
        </button>
      </div>
    </aside>
  );
}
