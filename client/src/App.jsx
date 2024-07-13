import { useEffect, useState } from "react";
import axios from "axios";

import TaskForm from "./components/TaskForm";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";

const API_URL = "http://localhost:5000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/tasks`)
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const addTask = (task) => {
    axios
      .post(`${API_URL}/tasks`, task)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        console.error("There was an error adding the task!", error);
      });
  };

  const updateTask = (id, updatedTask) => {
    axios
      .put(`${API_URL}/tasks/${id}`, updatedTask)
      .then((response) => {
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`${API_URL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };

  const filteredTasks = tasks.filter(
    (task) => filterStatus === "All" || task.status === filterStatus
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create New Task
        </button>
      </div>
      <TaskList
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm addTask={addTask} />
      </Modal>
    </div>
  );
}

export default App;
