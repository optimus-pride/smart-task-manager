import {useState, useEffect} from "react";
import {getTasks, deleteTask} from "../services/taskService";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import EditTaskForm from "./EditTaskForm";

function Dashboard({ userName, onLogout, onAuthError }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);

        if (error.status === 401) {
          onAuthError();
          return;
        }

        setError(error.message);
      } finally{
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((previousTasks) => [newTask, ...previousTasks]);
    setShowTaskForm(false); // Close the form after creating a task
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((previousTasks) =>
        previousTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
        )
    );

    setEditingTask(null); // Close the edit form after updating
  };

  const handleDelete = async (taskId) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    setDeletingTaskId(taskId);

    try {
        await deleteTask(taskId);

        setTasks((previousTasks) =>
            previousTasks.filter((task) => task._id !== taskId)
        );
    } catch (error) {
        console.error("Failed to delete task:", error);
        if (error.status === 401) {
        onAuthError();
        return;
        }
        setError(error.message);
    } finally {
        setDeletingTaskId(null);
    }
  };

  const handleEdit = (task) => {
  setEditingTask(task);
  };

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
      <header className="topbar">
        <h1>Task Manager</h1>

        <div className="topbar-actions">
          <button
            className="theme-button"
            onClick={() => setDarkMode((previousMode) => !previousMode)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="page-header">
          <div>
            <h2>Welcome, {userName}!</h2>
            <p>Manage your tasks and stay organized.</p>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <section className="task-section">
          {!showTaskForm ? (
            <div className="create-task-container">
              <button
                className="primary-button"
                onClick={() => setShowTaskForm(true)}
              >
                + Create Task
              </button>
            </div>
          ) : (
            <TaskForm 
              onTaskCreated={handleTaskCreated} 
              onCancel={() => setShowTaskForm(false)} 
            />
          )}
        </section>

        {editingTask && (
          <div 
            className="modal-overlay"
            onClick={() => setEditingTask(null)}
          >
            <div 
              className="edit-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-button"
                onClick={() => setEditingTask(null)}
                aria-label="Close edit task modal"
              >
                ×
              </button>

              <EditTaskForm
                task={editingTask}
                onTaskUpdated={handleTaskUpdated}
                onCancel={() => setEditingTask(null)}
                onAuthError={onAuthError}
              />
            </div>
          </div>
        )}

        <section className="task-section">
          <div className="task-filters">
            <div className="form-group">
              <label htmlFor="task-search">Search</label>
              <input
                id="task-search"
                type="text"
                placeholder="Search tasks by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status-filter">Status</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </section>  

        <section className="task-section">
          <div className="section-header">
            <h3>Tasks</h3>
            <span className="task-count">{filteredTasks.length}</span>
          </div>

          {loading ? (
            <p className="state-message">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks found</h3>
            </div>
          ) : (
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={deletingTaskId === task._id}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );

}

export default Dashboard;