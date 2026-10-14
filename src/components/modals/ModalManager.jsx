import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalState } from "../../redux/boardsSlice";
import ViewTaskModal from "./ViewTaskModal";
import AddEditTaskModal from "./AddEditTaskModal";
import AddEditBoardModal from "./AddEditBoardModal";
import DeleteModal from "./DeleteModal";

export default function ModalManager() {
  const dispatch = useDispatch();
  const { type, isOpen } = useSelector((state) => state.boards.modalState);

  if (!isOpen) return null;

  const closeModal = () => {
    dispatch(setModalState({ type: null, isOpen: false, selectedTask: null }));
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-dark-card w-full max-w-md rounded-xl p-8 relative max-h-[90vh] overflow-y-auto shadow-xl"
      >
        {type === "viewTask" && <ViewTaskModal onClose={closeModal} />}
        {(type === "addTask" || type === "editTask") && (
          <AddEditTaskModal onClose={closeModal} />
        )}
        {(type === "addBoard" || type === "editBoard") && (
          <AddEditBoardModal onClose={closeModal} />
        )}
        {(type === "deleteBoard" || type === "deleteTask") && (
          <DeleteModal onClose={closeModal} />
        )}
      </div>
    </div>
  );
}
