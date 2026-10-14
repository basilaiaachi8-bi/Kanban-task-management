import React from "react";
import { useDispatch } from "react-redux";
import { setModalState } from "../redux/boardsSlice";

export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const completedSubtasks = task.subtasks.filter((s) => s.isCompleted).length;

  const handleOpenTask = () => {
    dispatch(
      setModalState({
        type: "viewTask",
        isOpen: true,
        selectedTask: task,
      }),
    );
  };

  return (
    <div
      onClick={handleOpenTask}
      className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-[0_4px_6px_rgba(54,78,126,0.1015)] cursor-pointer group transition-all duration-200 hover:shadow-md"
    >
      <h4 className="text-black dark:text-white font-bold text-base group-hover:text-primary transition-colors mb-2">
        {task.title}
      </h4>
      <p className="text-mediumGray text-xs font-bold">
        {completedSubtasks} of {task.subtasks.length} subtasks
      </p>
    </div>
  );
}
