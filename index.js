require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./src/config/database.js");
const nasabahRouter = require("./src/routes/nasabah.routes.js")
const errorHandler = require('./src/middlewares/errorHandler.js')

app.use(express.json());
app.use(cors());
app.get("/health", async (req, res, next) => {
  try {
    const reuslt = await pool.query("SELECT NOW()");
    res.json({
      status: "success",
      message: "Server dan database aktif",
      database_time: reuslt.rows[0].now,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API Sistem Berjalan dengan Baik!",
    endpoint: {
      health: "/health",
      nasabah: "/api/nasabah",
    },
  });
});



app.use('/api/nasabah', nasabahRouter)

app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "Endpoint tidak ditemukan!",
  });
});
app.use(errorHandler);

app.listen(3060, () => {
  console.log(`Server running on : http://localhost:3060`);
});
