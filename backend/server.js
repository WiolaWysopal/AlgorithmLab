const express = require("express");
const cors = require("cors");

const insertionSort = require("./algorithms/insertionSort");
const bubbleSort = require("./algorithms/bubbleSort");
const selectionSort = require("./algorithms/selectionSort");
const mergeSort = require("./algorithms/mergeSort");
const quickSort = require("./algorithms/quickSort");

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

// Endpoint dla Bubble Sort
app.post("/sort/bubble", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = bubbleSort(array);
  res.json(result);
});

// Endpoint dla Selection Sort
app.post("/sort/selection", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = selectionSort(array);
  res.json(result);
});

// Endpoint dla Merge Sort
app.post("/sort/merge", (req, res) => {
  const { array } = req.body;

  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }

  const result = mergeSort(array);
  res.json(result);
});

app.post("/sort/quick", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = quickSort(array);
  res.json(result);
});

app.listen(5000, () => {
  console.log("Backend works at http://localhost:5000");
});
