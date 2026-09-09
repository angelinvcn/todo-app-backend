import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, dan password wajib diisi",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password minimal 6 karakter",
    });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email dan password wajib diisi",
    });
  }

  next();
};

export const validateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { task } = req.body;

  if (!task || typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({
      message: "Task wajib diisi",
    });
  }

  next();
};