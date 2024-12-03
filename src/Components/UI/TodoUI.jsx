import { useState, useEffect } from "react";

const TodoUI = () => {
  // State for form input
  const [task, setTask] = useState("");

  // State for task list
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, task]); // Add the new task to the list
      setTask(""); // Reset the input field
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setTask(event.target.value); // Update the input value
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-700">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md mx-4 sm:w-96">
          <h1 className="text-2xl sm:text-3xl font-serif text-gray-700 mb-6 text-center">
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your daily tasks"
              value={task}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md shadow-lg transition-transform transform hover:scale-105"
            >
              Add Task
            </button>
          </form>

          {/* Render tasks */}
          <div className="mt-6">
            <ul className="space-y-3">
              {tasks.map((taskItem, index) => (
                <li key={index} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{taskItem}</span>
                  </label>

                  {/* Delete button */}
                  <button
                    onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md shadow-md transition-transform transform hover:scale-105"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoUI;
