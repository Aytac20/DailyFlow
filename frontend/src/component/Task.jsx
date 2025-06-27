import React from "react";
import {
  FaBriefcase,
  FaBook,
  FaHome,
  FaSchool,
  FaHeartbeat,
  FaUserFriends,
  FaLaptopCode,
  FaUmbrellaBeach,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const categoryIcons = {
  work: <FaBriefcase className="text-lg mr-2 text-gray-700" />,
  study: <FaBook className="text-lg mr-2 text-gray-700" />,
  home: <FaHome className="text-lg mr-2 text-gray-700" />,
  school: <FaSchool className="text-lg mr-2 text-gray-700" />,
  health: <FaHeartbeat className="text-lg mr-2 text-gray-700" />,
  personal: <FaUserFriends className="text-lg mr-2 text-gray-700" />,
  tech: <FaLaptopCode className="text-lg mr-2 text-gray-700" />,
  leisure: <FaUmbrellaBeach className="text-lg mr-2 text-gray-700" />,
};

const formatDate = (dateString) => {
  if (!dateString) return "No due date";
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Task = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="p-4 rounded shadow mb-4 flex flex-col justify-between  relative hover:shadow-lg bg-white box-border">
      <span className="absolute top-3 right-3 shadow-md py-2 rounded-full pl-2">
        {categoryIcons[task.category.toLowerCase()]}
      </span>

      <div>
        <h5 className="font-semibold mt-4 tracking-wider text-slate-700 ">
          {task.title}
        </h5>
        <p className="text-base h-8 mt-4 text-slate-600 tracking-wide flex items-center">
          {task.description}
        </p>
        <p className="text-sm h-8 text-slate-500 tracking-wide">
          Due: {formatDate(task.dueDate)}
        </p>
        <div
          className={
            task.priority === "high"
              ? "text-red-600  bg-red-200 inline-block rounded-full px-4 py-[0.2rem] text-base "
              : task.priority === "medium"
              ? "text-yellow-600 bg-yellow-200 inline-block rounded-full px-4 py-[0.2rem] text-base"
              : "text-green-600 bg-green-300 inline-block rounded-full px-4 py-[0.2rem] text-base"
          }
        >
          {task.priority === "high"
            ? `😥 ${task.priority} `
            : task.priority === "medium"
            ? `😉 ${task.priority} `
            : `😎 ${task.priority} `}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <button className="p-2 mr-2" onClick={() => onEdit(task)}>
            <FaEdit className="hover:scale-125 duration-200 transition-transform" />
          </button>
          <button className="p-2" onClick={() => onDelete(task._id)}>
            <FaTrash className="hover:scale-125 duration-200 transition-transform" />
          </button>
        </div>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
        />
      </div>
    </div>
  );
};

export default Task;
