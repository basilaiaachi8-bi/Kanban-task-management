import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBoard, editBoard } from "../../redux/boardsSlice";

export default function AddEditBoardModal({ onClose }) {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.boards.modalState);
  const boards = useSelector((state) => state.boards.boards);
  const activeBoardIndex = useSelector(
    (state) => state.boards.activeBoardIndex,
  );
  const activeBoard = boards[activeBoardIndex];

  const [boardName, setBoardName] = useState("");
  const [boardColumns, setBoardColumns] = useState(["Todo", "Doing"]);

  const [isNameValid, setIsNameValid] = useState(true);
  const [columnErrors, setColumnErrors] = useState([false, false]);

  useEffect(() => {
    if (activeBoard && type === "editBoard") {
      setBoardName(activeBoard.name);
      setBoardColumns(activeBoard.columns.map((c) => c.name));
      setColumnErrors(activeBoard.columns.map(() => false));
    } else if (type === "addBoard") {
      setBoardName("");
      setBoardColumns(["Todo", "Doing"]);
      setColumnErrors([false, false]);
    }
  }, [type, activeBoard]);

  const handleColumnChange = (index, value) => {
    const newCols = [...boardColumns];
    newCols[index] = value;
    setBoardColumns(newCols);

    const newErrors = [...columnErrors];
    newErrors[index] = false;
    setColumnErrors(newErrors);
  };

  const addColumnInput = () => {
    setBoardColumns([...boardColumns, ""]);
    setColumnErrors([...columnErrors, false]);
  };

  const removeColumnInput = (index) => {
    setBoardColumns(boardColumns.filter((_, i) => i !== index));
    setColumnErrors(columnErrors.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    if (!boardName.trim()) {
      setIsNameValid(false);
      isValid = false;
    }

    const newColErrors = boardColumns.map((c) => !c.trim());
    if (newColErrors.some((err) => err)) {
      setColumnErrors(newColErrors);
      isValid = false;
    }

    if (!isValid) return;

    const formattedColumns = boardColumns.map((c, i) => ({
      id:
        type === "editBoard" && activeBoard.columns[i]?.id
          ? activeBoard.columns[i].id
          : `col-${Date.now()}-${i}`,
      name: c,
      tasks:
        type === "editBoard" && activeBoard.columns[i]
          ? activeBoard.columns[i].tasks
          : [],
    }));

    if (type === "addBoard") {
      dispatch(
        addBoard({
          id: `board-${Date.now()}`,
          name: boardName,
          columns: formattedColumns,
        }),
      );
    } else if (type === "editBoard") {
      dispatch(editBoard({ name: boardName, columns: formattedColumns }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-black dark:text-white">
          {type === "addBoard" ? "Add New Board" : "Edit Board"}
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
            Board Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={boardName}
              onChange={(e) => {
                setBoardName(e.target.value);
                setIsNameValid(true);
              }}
              placeholder="e.g. Web Design"
              className={`w-full bg-transparent border rounded-md p-3 text-sm text-black dark:text-white outline-none pr-28 ${
                !isNameValid
                  ? "border-destructive"
                  : "border-lines dark:border-dark-line focus:border-primary"
              }`}
            />
            {!isNameValid && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive text-xs font-medium">
                Can't be empty
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-mediumGray block mb-2">
            Board Columns
          </label>
          <div className="space-y-2">
            {boardColumns.map((col, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={col}
                    onChange={(e) => handleColumnChange(index, e.target.value)}
                    placeholder="e.g. Todo"
                    className={`w-full bg-transparent border rounded-md p-3 text-sm text-black dark:text-white outline-none pr-28 ${
                      columnErrors[index]
                        ? "border-destructive"
                        : "border-lines dark:border-dark-line focus:border-primary"
                    }`}
                  />
                  {columnErrors[index] && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive text-xs font-medium">
                      Can't be empty
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeColumnInput(index)}
                  className="text-mediumGray hover:text-destructive font-bold px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addColumnInput}
            className="w-full mt-3 bg-light dark:bg-white text-primary hover:bg-primary/10 py-2 rounded-full font-bold text-sm transition-colors"
          >
            + Add New Column
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-full font-bold text-sm transition-colors"
      >
        {type === "addBoard" ? "Create New Board" : "Save Changes"}
      </button>
    </form>
  );
}
