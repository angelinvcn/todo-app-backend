import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { validateTodo } from "../middleware/validator";

const router = Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, validateTodo, createTodo);
router.put("/:id", authMiddleware, validateTodo, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;