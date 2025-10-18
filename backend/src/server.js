const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const authRoutes = require("./controllers/authController");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => res.send({ ok: true }));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
