const express = require("express");
const cors = require("cors");

const postRoutes = require("./routes/postsRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const dotenv = require("dotenv");
dotenv.config();

const { sequelize } = require("../models");

const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    console.error("Health check DB error:", err.message);
    res.json({ status: "degraded", db: "disconnected", error: err.message });
  }
});

app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/posts", postRoutes);

module.exports = app;
