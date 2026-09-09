import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Todo API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          background: #f5f5f5;
        }

        h1 {
          text-align: center;
        }

        .card {
          background: white;
          padding: 20px;
          margin: 20px 0;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          box-sizing: border-box;
        }

        button {
          padding: 10px 20px;
          margin-top: 8px;
          cursor: pointer;
        }

        pre {
          background: #eee;
          padding: 15px;
          overflow-x: auto;
        }
      </style>
    </head>

    <body>

      <h1>Todo API Backend</h1>

      <div class="card">
        <h2>Register</h2>

        <input id="username" placeholder="Username">
        <input id="email" placeholder="Email">
        <input id="password" type="password" placeholder="Password">

        <button onclick="register()">Register</button>

        <pre id="registerResult"></pre>
      </div>

      <div class="card">
        <h2>Login</h2>

        <input id="loginEmail" placeholder="Email">
        <input id="loginPassword" type="password" placeholder="Password">

        <button onclick="login()">Login</button>

        <pre id="loginResult"></pre>
      </div>

      <div class="card">
        <h2>Tambah Task</h2>

        <input id="task" placeholder="Nama task">

        <button onclick="addTask()">Tambah Task</button>

        <pre id="postResult"></pre>
      </div>

      <div class="card">
        <h2>Get Task</h2>

        <button onclick="getTasks()">Lihat Semua Task</button>

        <pre id="getResult"></pre>
      </div>

      <script>

        let token = "";

        async function register() {

          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: document.getElementById("username").value,
              email: document.getElementById("email").value,
              password: document.getElementById("password").value
            })
          });

          const data = await response.json();

          document.getElementById("registerResult").textContent =
            JSON.stringify(data, null, 2);
        }


        async function login() {

          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: document.getElementById("loginEmail").value,
              password: document.getElementById("loginPassword").value
            })
          });

          const data = await response.json();

          if (data.token) {
            token = data.token;
          }

          document.getElementById("loginResult").textContent =
            JSON.stringify(data, null, 2);
        }


        async function addTask() {

          const response = await fetch("/api/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
              task: document.getElementById("task").value
            })
          });

          const data = await response.json();

          document.getElementById("postResult").textContent =
            JSON.stringify(data, null, 2);
        }


        async function getTasks() {

          const response = await fetch("/api/todos", {
            method: "GET",
            headers: {
              "Authorization": "Bearer " + token
            }
          });

          const data = await response.json();

          document.getElementById("getResult").textContent =
            JSON.stringify(data, null, 2);
        }

      </script>

    </body>
    </html>
  `);
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;