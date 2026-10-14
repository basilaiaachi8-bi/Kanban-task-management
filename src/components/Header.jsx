import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalState,
  setActiveBoardIndex,
  setTheme,
} from "../redux/boardsSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { boards, activeBoardIndex, theme } = useSelector(
    (state) => state.boards,
  );
  const activeBoard = boards[activeBoardIndex];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenAddTask = () => {
    dispatch(
      setModalState({ type: "addTask", isOpen: true, selectedTask: null }),
    );
  };

  const handleOpenEditBoard = () => {
    setIsMenuOpen(false);
    dispatch(
      setModalState({ type: "editBoard", isOpen: true, selectedTask: null }),
    );
  };

  const handleOpenDeleteBoard = () => {
    setIsMenuOpen(false);
    dispatch(
      setModalState({ type: "deleteBoard", isOpen: true, selectedTask: null }),
    );
  };

  return (
    <header className="bg-white dark:bg-dark-card border-b border-lines dark:border-dark-line h-[73px] md:h-[97px] flex items-center justify-between px-4 md:px-8 flex-shrink-0 transition-colors duration-300 relative z-30">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4 pr-6 md:border-r border-lines dark:border-dark-line">
          <img
            src="/logo-kanban.svg"
            alt="kanban logo"
            className="w-6 h-6 md:hidden"
          />
          <div className="hidden md:flex items-center space-x-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            <span className="w-1.5 h-6 bg-primary/70 rounded-full"></span>
            <span className="w-1.5 h-6 bg-primary/40 rounded-full"></span>
            <h1 className="text-black dark:text-white font-bold text-2xl tracking-wide ml-2">
              kanban
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <h2 className="text-black dark:text-white font-bold text-lg md:text-xl truncate max-w-[180px] md:max-w-xs">
            {activeBoard ? activeBoard.name : "No Board"}
          </h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary font-bold text-sm p-1"
          >
            <span
              className={`inline-block transition-transform duration-200 ${isMobileMenuOpen ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleOpenAddTask}
          disabled={
            !activeBoard ||
            !activeBoard.columns ||
            activeBoard.columns.length === 0
          }
          className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-4 py-3 md:px-6 md:py-3 rounded-full font-bold text-sm flex items-center space-x-2 transition-colors"
        >
          <span className="text-lg leading-none">+</span>
          <span className="hidden md:inline">Add New Task</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-mediumGray hover:text-black dark:hover:text-white p-2 font-bold text-xl transition-colors"
          >
            ⋮
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-dark-card shadow-xl rounded-lg py-3 z-50 border border-lines dark:border-dark-line">
              <button
                onClick={handleOpenEditBoard}
                className="w-full text-left px-4 py-2 text-sm text-mediumGray hover:bg-primary/10 hover:text-primary font-medium transition-colors"
              >
                Edit Board
              </button>
              <button
                onClick={handleOpenDeleteBoard}
                className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 font-medium transition-colors"
              >
                Delete Board
              </button>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden fixed inset-0 top-[73px] bg-black/50 z-40 flex justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-card w-full max-w-sm rounded-2xl p-6 shadow-2xl h-fit space-y-4"
          >
            <h3 className="text-mediumGray font-bold text-xs tracking-widest uppercase px-2">
              All Boards ({boards.length})
            </h3>
            <div className="flex flex-col space-y-1">
              {boards.map((board, index) => (
                <button
                  key={board.id || index}
                  onClick={() => {
                    dispatch(setActiveBoardIndex(index));
                    setIsMobileMenuOpen(false);
                  }}
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
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  dispatch(
                    setModalState({
                      type: "addBoard",
                      isOpen: true,
                      selectedTask: null,
                    }),
                  );
                }}
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

            <div className="bg-light dark:bg-dark-bg flex items-center justify-center space-x-4 py-3 rounded-md transition-colors mt-4">
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
          </div>
        </div>
      )}
    </header>
  );
}
