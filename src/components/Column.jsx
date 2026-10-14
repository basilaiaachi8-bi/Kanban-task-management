import React from "react";
import TaskCard from "./TaskCard";

const dotColors = [
  "bg-[#49C4E5]",
  "bg-[#8471F2]",
  "bg-[#67E2AE]",
  "bg-[#FF6B6B]",
  "bg-[#FFA500]",
];

export default function Column({ column, index }) {
  const dotColor = dotColors[index % dotColors.length];

  return (
    <div className="w-72 flex-shrink-0 flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <span className={`w-3 h-3 rounded-full ${dotColor}`}></span>
        <h3 className="text-mediumGray font-bold text-xs tracking-widest uppercase">
          {column.name} ({column.tasks.length})
        </h3>
      </div>

      <div className="flex flex-col space-y-6 flex-grow">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
