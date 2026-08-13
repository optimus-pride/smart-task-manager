import { useState } from "react";
import { updateTask, generateTaskDescription } from "../services/taskService";

function EditTaskForm({ task, onTaskUpdated, onCancel, onAuthError }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
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
        const data = await updateTask(task._id, {
            title,
            description,
            status,
            priority,
        });

        console.log("Task updated:", data);

        onTaskUpdated(data.task);
    } catch (error) {
        console.error("Failed to update task:", error);
        
        if (error.status === 401) {
          onAuthError();
          return;
        }
        
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="task-form-card edit-task-card">
      <div className="task-form-header">
        <h3>Edit Task</h3>
        <p>Update the details of your task.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-description">Description</label>

          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={4}
          />

          <button
            type="button"
            className="secondary-button ai-button"
            onClick={handleGenerateDescription}
            disabled={aiLoading || loading}
          >
            {aiLoading ? "Generating..." : "✨ Generate Description"}
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-priority">Priority</label>
            <select
              id="edit-priority"
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
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskForm;