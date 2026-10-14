import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, editTask } from "../../redux/boardsSlice";

export default function AddEditTaskModal({ onClose }) {
  const dispatch = useDispatch();
  const { type, selectedTask } = useSelector(
    (state) => state.boards.modalState,
  );
  const boards = useSelector((state) => state.boards.boards);
  const activeBoardIndex = useSelector(
    (state) => state.boards.activeBoardIndex,
  );
  const activeBoard = boards[activeBoardIndex];

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [subtasks, setSubtasks] = useState(["", ""]);
  const [taskStatus, setTaskStatus] = useState("");

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [subtaskErrors, setSubtaskErrors] = useState([false, false]);

  useEffect(() => {
    if (selectedTask && type === "editTask") {
      setTaskTitle(selectedTask.title);
      setTaskDesc(selectedTask.description);
      setSubtasks(selectedTask.subtasks.map((s) => s.title));
      setTaskStatus(selectedTask.status);
      setSubtaskErrors(selectedTask.subtasks.map(() => false));
    } else if (type === "addTask" && activeBoard?.columns.length > 0) {
      setTaskTitle("");
      setTaskDesc("");
      setSubtasks(["", ""]);
      setTaskStatus(activeBoard.columns[0].name);
      setSubtaskErrors([false, false]);
    }
  }, [type, selectedTask, activeBoard]);

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = value;
    setSubtasks(newSubtasks);

    const newErrors = [...subtaskErrors];
    newErrors[index] = false;
    setSubtaskErrors(newErrors);
  };

  const addSubtaskInput = () => {
    setSubtasks([...subtasks, ""]);
    setSubtaskErrors([...subtaskErrors, false]);
  };

  const removeSubtaskInput = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
    setSubtaskErrors(subtaskErrors.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    if (!taskTitle.trim()) {
      setIsTitleValid(false);
      isValid = false;
    }

    const newSubtaskErrors = subtasks.map((s) => !s.trim());
    if (newSubtaskErrors.some((err) => err)) {
      setSubtaskErrors(newSubtaskErrors);
      isValid = false;
    }

    if (!isValid) return;

    const formattedSubtasks = subtasks.map((s) => ({
      title: s,
      isCompleted: false,
    }));

    if (type === "addTask") {
      dispatch(
        addTask({
          title: taskTitle,
          description: taskDesc,
          status: taskStatus,
          subtasks: formattedSubtasks,
        }),
      );
    } else if (type === "editTask") {
      dispatch(
        editTask({
          id: selectedTask.id,
          title: taskTitle,
          description: taskDesc,
          status: taskStatus,
          subtasks: formattedSubtasks,
        }),
      );
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-black dark:text-white">
          {type === "addTask" ? "Add New Task" : "Edit Task"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-mediumGray hover:text-black dark:hover:text-white font-bold text-lg px-2"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs font-bold text-mediumGray block mb-2">
            Title
          </label>
          <div className="relative">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
                setIsTitleValid(true);
              }}
              placeholder="e.g. Take coffee break"
              className={`w-full bg-transparent border rounded-md p-3 text-sm text-black dark:text-white outline-none pr-28 ${
                !isTitleValid
                  ? "border-destructive"
                  : "border-lines dark:border-dark-line focus:border-primary"
              }`}
            />
            {!isTitleValid && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive text-xs font-medium">
                Can't be empty
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-mediumGray block mb-2">
            Description
          </label>
          <textarea
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            placeholder="e.g. It's always good to take a break..."
            rows={4}
            className="w-full bg-transparent border border-lines dark:border-dark-line rounded-md p-3 text-sm text-black dark:text-white outline-none focus:border-primary resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-mediumGray block mb-2">
            Subtasks
          </label>
          <div className="space-y-2">
            {subtasks.map((sub, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={sub}
                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                    placeholder="e.g. Make coffee"
                    className={`w-full bg-transparent border rounded-md p-3 text-sm text-black dark:text-white outline-none pr-28 ${
                      subtaskErrors[index]
                        ? "border-destructive"
                        : "border-lines dark:border-dark-line focus:border-primary"
                    }`}
                  />
                  {subtaskErrors[index] && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive text-xs font-medium">
                      Can't be empty
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeSubtaskInput(index)}
                  className="text-mediumGray hover:text-destructive font-bold px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSubtaskInput}
            className="w-full mt-3 bg-light dark:bg-white text-primary hover:bg-primary/10 py-2 rounded-full font-bold text-sm transition-colors"
          >
            + Add New Subtask
          </button>
        </div>

        <div>
          <label className="text-xs font-bold text-mediumGray block mb-2">
            Status
          </label>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
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

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-full font-bold text-sm transition-colors"
      >
        {type === "addTask" ? "Create Task" : "Save Changes"}
      </button>
    </form>
  );
}
