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

// przykładowy endpoint z opisem
// app.get("/description/insertion", (req, res) => {
//   // na początek tekst można trzymać w pamięci lub w zmiennej
//   const description = `
//     Insertion Sort is a simple sorting algorithm that builds the final sorted array
//     one item at a time. It is much less efficient on large lists than more advanced algorithms
//     such as quicksort, heapsort, or merge sort.
//   `;
//   res.json({ text: description });
// });


app.listen(5000, () => {
  console.log("Backend works at http://localhost:5000");
});
