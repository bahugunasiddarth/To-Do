import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const TaskPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for todos
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState("Medium"); // Default priority

  // Add a new todo
  const handleAddTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") return;

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      priority: newPriority, // Include priority
    };

    let updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));

    // Clear input fields
    setNewTitle("");
    setNewDescription("");
    setNewPriority("Medium"); // Reset priority to default
  };

  // Delete a todo
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  // Load todos from localStorage on component mount
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  // Logout functionality
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          To-Do List
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-full hover:from-red-600 hover:to-pink-600 active:scale-95 transition duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            aria-label="Logout"
          >
            Logout
          </button>
        </header>

        {/* Todo Input Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Add a New Task</h2>
          <div className="todo-input space-y-6">
            <div className="todo-input-item">
              <label className="block text-lg font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What's the task title?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="todo-input-item">
              <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="What's the task description?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="todo-input-item">
              <label className="block text-lg font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="todo-input-item">
              <button
                onClick={handleAddTodo}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full hover:from-blue-600 hover:to-indigo-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Add Task"
              >
                Add
              </button>
            </div>
          </div>
        </motion.section>

        {/* Todo List Section */}
        <section className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Tasks</h2>
          <div className="todo-list space-y-6">
            <AnimatePresence>
              {allTodos.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="todo-list-item flex justify-between items-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition duration-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <div
                      className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : item.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.priority} Priority
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDeleteTodo(index)}
                      className="text-red-500 hover:text-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      aria-label="Delete Task"
                    >
                      <AiOutlineDelete size={24} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TaskPage;