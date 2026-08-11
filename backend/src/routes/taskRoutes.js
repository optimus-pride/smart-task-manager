import express from "express";
import {createTask, getTasks, updateTask, deleteTask, getTask} from "../../controllers/taskController.js";
import {protect} from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

router.get("/:id", protect, getTask);


export default router;