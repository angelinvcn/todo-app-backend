import { Request, Response } from "express";
import * as todoModel from "../models/todoModel";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user_id;

    const todos = await todoModel.getByUserId(user_id);

    res.json(todos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal mengambil data Todo",
    });
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
) => {
  try {
    const user_id = (req as any).user_id;
    const id = Number(req.params.id);

    const todos = await todoModel.getById(id, user_id);

    if ((todos as any[]).length === 0) {
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      });
    }

    res.json((todos as any[])[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal mengambil Todo",
    });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user_id;
    const { task } = req.body;

    const result = await todoModel.create(user_id, task);

    res.status(201).json({
      message: "Todo berhasil ditambahkan",
      todo: {
        id: result.insertId,
        user_id: user_id,
        task: task,
        is_completed: false,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal menambahkan Todo",
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user_id;
    const id = Number(req.params.id);
    const { task, is_completed } = req.body;

    const result = await todoModel.update(
      id,
      user_id,
      task,
      is_completed
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      });
    }

    res.json({
      message: "Todo berhasil diperbarui",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal memperbarui Todo",
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user_id;
    const id = Number(req.params.id);

    const result = await todoModel.remove(id, user_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      });
    }

    res.json({
      message: "Todo berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal menghapus Todo",
    });
  }
};