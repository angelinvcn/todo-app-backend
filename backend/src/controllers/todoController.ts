import { Request, Response } from "express";
import pool from "../config/database";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user_id;

    const [rows] = await pool.execute(
      "SELECT * FROM todos WHERE user_id = ?",
      [user_id]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal mengambil data Todo",
    });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user_id;
    const { task } = req.body;

    const [result]: any = await pool.execute(
      "INSERT INTO todos (user_id, task, is_completed) VALUES (?, ?, ?)",
      [user_id, task, false]
    );

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
    const { id } = req.params;
    const { task, is_completed } = req.body;

    const [result]: any = await pool.execute(
      "UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?",
      [task, is_completed, id, user_id]
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
    const { id } = req.params;

    const [result]: any = await pool.execute(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

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