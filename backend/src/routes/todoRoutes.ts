import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

import {
  validateTodo,
  validateUpdateTodo,
} from "../middleware/validator";

const router = Router();

router.get("/", authMiddleware, getTodos);

router.get("/:id", authMiddleware, getTodoById);

router.post("/", authMiddleware, validateTodo, createTodo);

router.put(
  "/:id",
  authMiddleware,
  validateUpdateTodo,
  updateTodo
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTodo
);

export default router;