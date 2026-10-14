import { createSlice } from "@reduxjs/toolkit";
import initialData from "../data/initialData.json";

const initialState = {
  boards:
    JSON.parse(localStorage.getItem("kanban_boards")) || initialData.boards,
  activeBoardIndex: 0,
  isSidebarOpen: true,
  theme: localStorage.getItem("kanban_theme") || "light",
  modalState: {
    type: null,
    isOpen: false,
    selectedTask: null,
  },
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setActiveBoardIndex: (state, action) => {
      state.activeBoardIndex = action.payload;
      localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("kanban_theme", state.theme);
    },
    setModalState: (state, action) => {
      state.modalState = action.payload;
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
      state.activeBoardIndex = state.boards.length - 1;
      localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
    },
    editBoard: (state, action) => {
      const { name, columns } = action.payload;
      state.boards[state.activeBoardIndex].name = name;
      state.boards[state.activeBoardIndex].columns = columns;
      localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
    },
    deleteBoard: (state) => {
      state.boards.splice(state.activeBoardIndex, 1);
      state.activeBoardIndex = Math.max(0, state.activeBoardIndex - 1);
      localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
    },
    addTask: (state, action) => {
      const { title, description, status, subtasks } = action.payload;
      const board = state.boards[state.activeBoardIndex];
      const column = board.columns.find((col) => col.name === status);
      if (column) {
        column.tasks.push({
          id: `task-${Date.now()}`,
          title,
          description,
          status,
          subtasks,
        });
        localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
      }
    },
    editTask: (state, action) => {
      const { id, title, description, status, subtasks } = action.payload;
      const board = state.boards[state.activeBoardIndex];

      board.columns.forEach((col) => {
        col.tasks = col.tasks.filter((t) => t.id !== id);
      });

      const targetColumn = board.columns.find((col) => col.name === status);
      if (targetColumn) {
        targetColumn.tasks.push({
          id,
          title,
          description,
          status,
          subtasks,
        });
      }
      localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
    },
    deleteTask: (state, action) => {
      const { taskId } = action.payload;
      const board = state.boards[state.activeBoardIndex];
      board.columns.forEach((col) => {
        col.tasks = col.tasks.filter((t) => t.id !== taskId);
      });
      localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
    },
    setSubtaskCompleted: (state, action) => {
      const { taskIndex, subtaskIndex } = action.payload;
      const board = state.boards[state.activeBoardIndex];
      board.columns.forEach((col) => {
        col.tasks.forEach((task) => {
          if (task.id === taskIndex) {
            task.subtasks[subtaskIndex].isCompleted =
              !task.subtasks[subtaskIndex].isCompleted;
          }
        });
      });
      localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
    },
    changeTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const board = state.boards[state.activeBoardIndex];

      let movedTask = null;
      board.columns.forEach((col) => {
        const taskIndex = col.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          movedTask = col.tasks.splice(taskIndex, 1)[0];
          movedTask.status = newStatus;
        }
      });

      if (movedTask) {
        const targetCol = board.columns.find((col) => col.name === newStatus);
        if (targetCol) {
          targetCol.tasks.push(movedTask);
        }
      }
      localStorage.setItem("kanban_boards", JSON.stringify(state.boards));
    },
  },
});

export const {
  setActiveBoardIndex,
  toggleSidebar,
  setTheme,
  setModalState,
  addBoard,
  editBoard,
  deleteBoard,
  addTask,
  editTask,
  deleteTask,
  setSubtaskCompleted,
  changeTaskStatus,
} = boardsSlice.actions;

export default boardsSlice.reducer;
