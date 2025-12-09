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

app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "DB connection failed" });
  }
});

app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/posts", postRoutes);

module.exports = app;
