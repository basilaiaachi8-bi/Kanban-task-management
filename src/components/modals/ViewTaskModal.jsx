import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSubtaskCompleted,
  changeTaskStatus,
  deleteTask,
  setModalState,
} from "../../redux/boardsSlice";

export default function ViewTaskModal({ onClose }) {
  const dispatch = useDispatch();
  const { selectedTask } = useSelector((state) => state.boards.modalState);
  const boards = useSelector((state) => state.boards.boards);
  const activeBoardIndex = useSelector(
    (state) => state.boards.activeBoardIndex,
  );
  const activeBoard = boards[activeBoardIndex];

  const [status, setStatus] = useState(selectedTask.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const completedSubtasks = selectedTask.subtasks.filter(
    (s) => s.isCompleted,
  ).length;

  const handleCheckboxChange = (index) => {
    dispatch(
      setSubtaskCompleted({ taskIndex: selectedTask.id, subtaskIndex: index }),
    );
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    dispatch(changeTaskStatus({ taskId: selectedTask.id, newStatus }));
  };

  const handleDelete = () => {
    dispatch(setModalState({ type: "deleteTask", isOpen: true, selectedTask }));
  };

  const handleEdit = () => {
    dispatch(setModalState({ type: "editTask", isOpen: true, selectedTask }));
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-bold text-black dark:text-white pr-4">
          {selectedTask.title}
        </h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-mediumGray hover:text-black dark:hover:text-white font-bold px-2"
            >
              ⋮
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-bg shadow-lg rounded-lg py-2 z-50 border border-lines dark:border-dark-line">
                <button
                  onClick={handleEdit}
                  className="w-full text-left px-4 py-2 text-sm text-mediumGray hover:bg-primary/10 hover:text-primary font-medium"
                >
                  Edit Task
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 font-medium"
                >
                  Delete Task
                </button>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-mediumGray hover:text-black dark:hover:text-white font-bold text-lg px-2"
          >
            ✕
          </button>
        </div>
      </div>

      {selectedTask.description && (
        <p className="text-mediumGray text-sm mb-6 leading-relaxed">
          {selectedTask.description}
        </p>
      )}

      <div className="mb-6">
        <label className="text-xs font-bold text-mediumGray block mb-3">
          Subtasks ({completedSubtasks} of {selectedTask.subtasks.length})
        </label>
        <div className="space-y-2.5">
          {selectedTask.subtasks.map((subtask, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 bg-light dark:bg-dark-bg p-3 rounded-md cursor-pointer hover:bg-primary/5 transition-colors"
            >
              <input
                type="checkbox"
                checked={subtask.isCompleted}
                onChange={() => handleCheckboxChange(index)}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
              <span
                className={`text-sm font-bold ${subtask.isCompleted ? "line-through text-mediumGray" : "text-black dark:text-white"}`}
              >
                {subtask.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-mediumGray block mb-2">
          Current Status
        </label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full bg-transparent border border-lines dark:border-dark-line rounded-md p-3 text-sm text-black dark:text-white outline-none focus:border-primary cursor-pointer"
        >
          {activeBoard?.columns.map((col) => (
            <option
              key={col.id || col.name}
              value={col.name}
              className="dark:bg-dark-card"
            >
              {col.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
