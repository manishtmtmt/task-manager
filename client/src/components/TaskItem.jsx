import React from 'react'

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleStatusChange = (e) => {
    updateTask(task._id, { ...task, status: e.target.value });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "To Do":
        return "bg-blue-500 text-white";
      case "In Progress":
        return "bg-yellow-500 text-white";
      case "Done":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{task.title}</h3>
        <span className={`px-2 py-1 rounded ${getStatusBadge(task.status)}`}>
          {task.status}
        </span>
      </div>
      <p className="mt-2">{task.description}</p>
      <div className="mt-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Update Status
        </label>
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button
        onClick={() => deleteTask(task._id)}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete Task
      </button>
    </div>
  );
};

export default TaskItem