import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBoard, deleteTask } from "../../redux/boardsSlice";

export default function DeleteModal({ onClose }) {
  const dispatch = useDispatch();
  const { type, selectedTask } = useSelector(
    (state) => state.boards.modalState,
  );
  const boards = useSelector((state) => state.boards.boards);
  const activeBoardIndex = useSelector(
    (state) => state.boards.activeBoardIndex,
  );
  const activeBoard = boards[activeBoardIndex];

  const handleDelete = () => {
    if (type === "deleteBoard") {
      dispatch(deleteBoard());
    } else if (type === "deleteTask" && selectedTask) {
      dispatch(deleteTask({ taskId: selectedTask.id }));
    }
    onClose();
  };

  const isBoard = type === "deleteBoard";
  const title = isBoard ? "Delete this board?" : "Delete this task?";
  const description = isBoard
    ? `Are you sure you want to delete the '${activeBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`
    : `Are you sure you want to delete the '${selectedTask?.title}' task and its subtasks? This action cannot be reversed.`;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-destructive">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-mediumGray hover:text-black dark:hover:text-white font-bold text-lg px-2"
        >
          ✕
        </button>
      </div>

      <p className="text-mediumGray text-sm mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex space-x-4">
        <button
          onClick={handleDelete}
          className="w-full bg-destructive hover:bg-destructive-hover text-white py-3 rounded-full font-bold text-sm transition-colors"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="w-full bg-light dark:bg-white text-primary hover:bg-primary/10 py-3 rounded-full font-bold text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
