const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Built-in middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

app.use('/products', express.static(path.join(__dirname, 'products')));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

app.get("/", (_req, res) => {
  return res.send("Welcome to backend");
});

// Error handler middleware should be last
const errorHandler = require("./middleware/error");
app.use(errorHandler);

module.exports = app;