function TaskCard({ task, onEdit, onDelete, isDeleting }) {
  return (
    <li className="task-card">
      <div className="task-card-header">
        <h4>{task.title}</h4>

        <span className={`status-badge status-${task.status}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="task-description">
          {task.description}
        </p>
      )}

      <div className="task-meta">
        <span className="priority-label">Priority</span>

        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-actions">
        <button
          className="secondary-button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="danger-button"
          onClick={() => onDelete(task._id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </li>
  );
}

export default TaskCard;