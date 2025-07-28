const express = require("express");
const app = express();
const urlRoute = require("./routes/urlRoutes");
const { handleRedirect } = require("./controllers/urlController");
const cors = require("cors");

app.use(
  cors({
    origin: "https://url-shortner-six-jet.vercel.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", urlRoute);
app.use("/:code", handleRedirect);

module.exports = app;
