const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to fetch tasks");
    error.status = response.status;
    throw error;
  }

  return data;
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create task");
  }

  return data;
};

export const updateTask = async (taskId, taskData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to update task"
    );
    error.status = response.status;
    throw error;
  }

  return data;
};

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to delete task"
    );
    error.status = response.status;
    throw error;
  }

  return data;
};

export const generateTaskDescription = async (title) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/ai/generate-description`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to generate task description"
    );
    error.status = response.status;
    throw error;
  }

  return data;
};