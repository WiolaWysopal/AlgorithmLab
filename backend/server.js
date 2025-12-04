const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// test endpoint
app.get("/", (req, res) => {
  res.send("AlgorithmLab backend działa");
});

app.listen(5000, () => {
  console.log("Backend działa na http://localhost:5000");
});
