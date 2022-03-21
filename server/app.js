const express = require("express");
const app = express();
const port = 8000;

const cors = require("cors");
const corsOption = {
  credentials: true,
  origin: "http://localhost:4200",
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Authorization", "X-Requested-With",
    "X-HTTP-Method-Override", "Content-Type", "Cache-Control", "Accept"],
};

app.use(cors(corsOption));

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);
const settingsRoutes = require("./routes/settings.js");
app.use("/settings", settingsRoutes);
const stocksRoutes = require("./routes/stocks");
app.use("/stocks", stocksRoutes);

app.listen(port, () => {
  console.log(`HTTP server is starting listening on port ${port}`);
});
