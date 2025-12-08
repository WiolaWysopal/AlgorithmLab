const express = require("express");
const cors = require("cors");

const insertionSort = require("./algorithms/insertionSort");

const app = express();
app.use(cors());
app.use(express.json());

// test endpoint
app.get("/", (req, res) => {
  res.send("AlgorithmLab backend works");
});

// Endpoint dla Insertion Sort
app.post("/sort/insertion", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = insertionSort(array);
  res.json(result);
});

app.listen(5000, () => {
  console.log("Backend works at http://localhost:5000");
});
