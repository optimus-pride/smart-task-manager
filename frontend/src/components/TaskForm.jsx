import { useState } from "react";
import { createTask, generateTaskDescription } from "../services/taskService";

function TaskForm({ onTaskCreated, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleGenerateDescription = async () => {
    if (!title.trim()) {
      setError("Enter a task title first");
      return;
    }

    setError("");
    setAiLoading(true);

    try {
      const data = await generateTaskDescription(title);

      setDescription(data.description);
    } catch (error) {
      console.error("Failed to generate description:", error);

      setError(error.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
        setError("Task title is required");
        return;
    }

    if (title.trim().length > 100) {
        setError("Task title must be 100 characters or less");
        return;
    }

    if (description.trim().length > 500) {
        setError("Description must be 500 characters or less");
        return;
    }
    
    setLoading(true);

    try {
        const data = await createTask({
            title,
            description,
            status,
            priority,
        });

        console.log("Task created:", data);
        
        onTaskCreated(data.task);

        setTitle("");
        setDescription("");
        setStatus("pending");
        setPriority("medium");
    } catch (error) {
        console.error("Failed to create task:", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div className="task-form-card">
      <div className="task-form-header">
        <h3>Create Task</h3>
        <p>Add a new task to your list.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={4}
          />

          <button
            type="button"
            className="secondary-button"
            onClick={handleGenerateDescription}
            disabled={aiLoading || loading}
          >
            {aiLoading ? "Generating..." : "✨ Generate Description"}
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;