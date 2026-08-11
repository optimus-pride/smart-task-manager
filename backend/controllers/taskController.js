import mongoose from "mongoose";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      category,
      dueDate
    } = req.body;

    // Check required field
    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    // Create task for the authenticated user
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      category,
      dueDate,
      userId: req.user.userId
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.userId
    });

    res.status(200).json({
      tasks
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const task = await Task.findOne({
      _id: id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const {
      title,
      description,
      status,
      priority,
      category,
      dueDate
    } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.category = category ?? task.category;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const task = await Task.findOneAndDelete({
      _id: id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const task = await Task.findOne({
      _id: id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      task
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};