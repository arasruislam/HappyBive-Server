/* All required Files */
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

/* Middleware's */
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The Server is Running");
});

app.listen(port, () => {
  console.log("The Server running on port: ${port}");
});
