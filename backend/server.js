require("dotenv").config();
const { ChatOpenAI } = require("@langchain/openai");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const express = require("express");
const cors = require("cors");

const insertionSort = require("./algorithms/insertionSort");
const bubbleSort = require("./algorithms/bubbleSort");
const selectionSort = require("./algorithms/selectionSort");
const mergeSort = require("./algorithms/mergeSort");
const quickSort = require("./algorithms/quickSort");
const heapSort = require("./algorithms/heapSort");

const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// test endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Check if backend is running
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Backend is running
 */
app.get("/", (req, res) => {
  res.send("AlgorithmLab backend is running");
});

/**
 * @swagger
 * /algorithms/{name}:
 *   get:
 *     summary: Get algorithm description by name
 *     tags:
 *       - Algorithms
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: QuickSort
 *     responses:
 *       200:
 *         description: Algorithm description returned successfully
 *       404:
 *         description: Algorithm not found
 *       500:
 *         description: Internal server error
 */
app.get("/algorithms/:name", async (req, res) => {
  try {
    const { name } = req.params;

    const result = await pool.query(
      "SELECT id, name, description FROM algorithms WHERE name = $1",
      [name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Algorithm not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching algorithm description:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint dla Insertion Sort
/**
 * @swagger
 * /sort/insertion:
 *   post:
 *     summary: Execute Insertion Sort
 *     tags:
 *       - Sorting Algorithms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - array
 *             properties:
 *               array:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 2, 4, 3, 1]
 *     responses:
 *       200:
 *         description: Sorting steps returned successfully
 *       400:
 *         description: Invalid input - array is required
 */
app.post("/sort/insertion", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = insertionSort(array);
  res.json(result);
});

// Endpoint dla Bubble Sort
/**
 * @swagger
 * /sort/bubble:
 *   post:
 *     summary: Execute Bubble Sort
 *     tags:
 *       - Sorting Algorithms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - array
 *             properties:
 *               array:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 2, 4, 3, 1]
 *     responses:
 *       200:
 *         description: Sorting steps returned successfully
 *       400:
 *         description: Invalid input - array is required
 */
app.post("/sort/bubble", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = bubbleSort(array);
  res.json(result);
});

// Endpoint dla Selection Sort
/**
 * @swagger
 * /sort/selection:
 *   post:
 *     summary: Execute Selection Sort
 *     tags:
 *       - Sorting Algorithms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - array
 *             properties:
 *               array:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 2, 4, 3, 1]
 *     responses:
 *       200:
 *         description: Sorting steps returned successfully
 *       400:
 *         description: Invalid input - array is required
 */
app.post("/sort/selection", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = selectionSort(array);
  res.json(result);
});

// Endpoint dla Merge Sort
/**
 * @swagger
 * /sort/merge:
 *   post:
 *     summary: Execute Merge Sort
 *     tags:
 *       - Sorting Algorithms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - array
 *             properties:
 *               array:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 2, 4, 3, 1]
 *     responses:
 *       200:
 *         description: Sorting steps returned successfully
 *       400:
 *         description: Invalid input - array is required
 */
app.post("/sort/merge", (req, res) => {
  const { array } = req.body;

  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }

  const result = mergeSort(array);
  res.json(result);
});

// Endpoint dla Quick Sort
/**
 * @swagger
 * /sort/quick:
 *   post:
 *     summary: Execute Quick Sort
 *     tags:
 *       - Sorting Algorithms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - array
 *             properties:
 *               array:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 2, 4, 3, 1]
 *     responses:
 *       200:
 *         description: Sorting steps returned successfully
 *       400:
 *         description: Invalid input - array is required
 */
app.post("/sort/quick", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = quickSort(array);
  res.json(result);
});

// Endpoint dla Heap Sort
/**
 * @swagger
 * /sort/heap:
 *   post:
 *     summary: Execute Heap Sort
 *     tags:
 *       - Sorting Algorithms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - array
 *             properties:
 *               array:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 2, 4, 3, 1]
 *     responses:
 *       200:
 *         description: Sorting steps returned successfully
 *       400:
 *         description: Invalid input - array is required
 */
app.post("/sort/heap", (req, res) => {
  const { array } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }
  const result = heapSort(array);
  res.json(result);
});

// LangChain - API GPT
/**
 * @swagger
 * /ai/explain:
 *   post:
 *     summary: Generate AI explanation for a sorting algorithm
 *     tags:
 *       - AI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - algorithm
 *               - array
 *             properties:
 *               algorithm:
 *                 type: string
 *                 example: QuickSort
 *               array:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 2, 4, 3, 1]
 *     responses:
 *       200:
 *         description: AI explanation generated successfully
 *       400:
 *         description: Invalid input - algorithm and array are required
 *       500:
 *         description: AI service error
 */
app.post("/ai/explain", async (req, res) => {
  try {
    const { algorithm, array } = req.body;

    if (!algorithm || !Array.isArray(array)) {
      return res.status(400).json({
        error: "Algorithm name and array are required",
      });
    }

    const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.3,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await model.invoke(`
Explain the ${algorithm} algorithm for this input array: [${array.join(", ")}].

Return the answer in Markdown using exactly this structure:

### 1. Simple Explanation
Explain the algorithm in beginner-friendly language.

### 2. What Happens With This Specific Array
Describe how the algorithm works on this exact array.

### 3. Time Complexity
Include best, average, and worst case.

### 4. When To Use It
Explain practical use cases and limitations.

### 5. Interview Questions With Answers
Provide exactly three interview questions.
For each question, include a short example answer.
`);

    res.json({
      explanation: response.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Backend works at http://localhost:5000");
});
