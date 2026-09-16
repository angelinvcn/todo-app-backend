import pool from "../config/database";

export const getByUserId = async (user_id: number) => {
  const [rows] = await pool.execute(
    "SELECT * FROM todos WHERE user_id = ?",
    [user_id]
  );

  return rows;
};

export const getById = async (
  id: number,
  user_id: number
) => {
  const [rows] = await pool.execute(
    "SELECT * FROM todos WHERE id = ? AND user_id = ?",
    [id, user_id]
  );

  return rows;
};

export const create = async (
  user_id: number,
  task: string
) => {
  const [result]: any = await pool.execute(
    "INSERT INTO todos (user_id, task, is_completed) VALUES (?, ?, ?)",
    [user_id, task, false]
  );

  return result;
};

export const update = async (
  id: number,
  user_id: number,
  task: string,
  is_completed: boolean
) => {
  const [result]: any = await pool.execute(
    "UPDATE todos SET task = ?, is_completed = ? WHERE id = ? AND user_id = ?",
    [task, is_completed, id, user_id]
  );

  return result;
};

export const remove = async (
  id: number,
  user_id: number
) => {
  const [result]: any = await pool.execute(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [id, user_id]
  );

  return result;
};