import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Todo API Backend is running!",
  });
});

// Semua route API
app.use("/api", routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route tidak ditemukan",
  });
});

export default app;