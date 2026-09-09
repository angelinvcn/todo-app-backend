import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    console.log("DATA REGISTER:", {
      username,
      email,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "Register berhasil",
    });
  } catch (error) {
    console.error("ERROR REGISTER:", error);

    res.status(500).json({
      message: "Register gagal",
      error: String(error),
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [rows]: any = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    console.error("ERROR LOGIN:", error);

    res.status(500).json({
      message: "Login gagal",
      error: String(error),
    });
  }
};