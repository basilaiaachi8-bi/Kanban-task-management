import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Column from "./Column";
import { setModalState } from "../redux/boardsSlice";

export default function Board() {
  const dispatch = useDispatch();
  const { boards, activeBoardIndex } = useSelector((state) => state.boards);
  const activeBoard = boards[activeBoardIndex];

  if (
    !activeBoard ||
    !activeBoard.columns ||
    activeBoard.columns.length === 0
  ) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center bg-light dark:bg-dark-bg transition-colors">
        <p className="text-mediumGray font-bold text-lg mb-6">
          This board is empty. Create a new column to get started.
        </p>
        <button
          onClick={() =>
            dispatch(
              setModalState({
                type: "editBoard",
                isOpen: true,
                selectedTask: null,
              }),
            )
          }
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-bold text-sm transition-colors flex items-center space-x-2 shadow-lg"
        >
          <span>+ Add New Column</span>
        </button>
      </div>
    );
  }

  return (
    <main className="flex-grow overflow-x-auto p-6 bg-light dark:bg-dark-bg transition-colors flex space-x-6 items-start">
      {activeBoard.columns.map((column, index) => (
        <Column key={column.id || index} column={column} index={index} />
      ))}

      <div
        onClick={() =>
          dispatch(
            setModalState({
              type: "editBoard",
              isOpen: true,
              selectedTask: null,
            }),
          )
        }
        className="w-72 flex-shrink-0 bg-gradient-to-b from-[#E9EFFA80] to-[#EAEAF840] dark:from-[#2B2C3725] dark:to-[#2B2C3710] rounded-lg flex items-center justify-center cursor-pointer hover:text-primary text-mediumGray font-bold text-xl transition-all duration-200 mt-10 h-[calc(100vh-180px)] min-h-[500px]"
      >
        + New Column
      </div>
    </main>
  );
}
