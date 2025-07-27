const express = require("express");
const app = express();
const urlRoute = require("./routes/urlRoutes");
const { handleRedirect } = require("./controllers/urlController");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", urlRoute);
app.use("/:code", handleRedirect);

module.exports = app;
