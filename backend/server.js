require("dotenv").config();
const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai");

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
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.3,
  apiKey: process.env.OPENAI_API_KEY,
});

const embeddingsModel = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: process.env.OPENAI_API_KEY,
});

const aiExplanationCache = new Map();
const aiQuizCache = new Map();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function initializeDatabase() {
  await pool.query(`
    ALTER TABLE algorithms
    ADD COLUMN IF NOT EXISTS embedding JSONB;
  `);
}

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

    const cacheKey = `${algorithm}:${array.join(",")}`;

    if (aiExplanationCache.has(cacheKey)) {
      return res.json({
        explanation: aiExplanationCache.get(cacheKey),
        cached: true,
      });
    }

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

    aiExplanationCache.set(cacheKey, response.content);

    res.json({
      explanation: response.content,
      cached: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /ai/quiz:
 *   post:
 *     summary: Generate AI quiz for a sorting algorithm
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
 *                 example: BubbleSort
 *               array:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [5, 2, 4, 3, 1]
 *     responses:
 *       200:
 *         description: AI quiz generated successfully
 *       400:
 *         description: Invalid input - algorithm and array are required
 *       500:
 *         description: AI service error
 */
app.post("/ai/quiz", async (req, res) => {
  try {
    const { algorithm, array } = req.body;

    if (!algorithm || !Array.isArray(array)) {
      return res.status(400).json({
        error: "Algorithm name and array are required",
      });
    }

    const cacheKey = `${algorithm}:${array.join(",")}`;

    if (aiQuizCache.has(cacheKey)) {
      return res.json({
        quiz: aiQuizCache.get(cacheKey),
        cached: true,
      });
    }

    const response = await model.invoke(`
Create a short educational quiz about the ${algorithm} algorithm for this input array: [${array.join(", ")}].

Return the answer in Markdown using exactly this structure:

### Algorithm Quiz: ${algorithm}

Create exactly 5 questions.

For each question include:
- the question,
- four answer options: A, B, C, D,
- the correct answer,
- a short explanation.

The questions should test:
- algorithm behavior,
- time complexity,
- step-by-step execution,
- practical use cases,
- interview-style understanding.
`);

    aiQuizCache.set(cacheKey, response.content);

    res.json({
      quiz: response.content,
      cached: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

function cosineSimilarity(vectorA, vectorB) {
  const dotProduct = vectorA.reduce((sum, value, index) => {
    return sum + value * vectorB[index];
  }, 0);

  const magnitudeA = Math.sqrt(vectorA.reduce((sum, value) => sum + value * value, 0));

  const magnitudeB = Math.sqrt(vectorB.reduce((sum, value) => sum + value * value, 0));

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

function keywordBoost(question, algorithm) {
  const normalizedQuestion = question.toLowerCase();
  const normalizedText = `${algorithm.name} ${algorithm.description}`.toLowerCase();

  let boost = 0;

  if (
    normalizedQuestion.includes("adaptive") &&
    normalizedText.includes("adaptive") &&
    !normalizedText.includes("not adaptive")
  ) {
    boost += 0.15;
  }

  if (
    normalizedQuestion.includes("o(n)") &&
    normalizedText.includes("best-case time complexity: o(n)")
  ) {
    boost += 0.15;
  }

  if (
    (normalizedQuestion.includes("nearly sorted") ||
      normalizedQuestion.includes("almost sorted") ||
      normalizedQuestion.includes("mostly sorted")) &&
    (normalizedText.includes("nearly sorted") ||
      normalizedText.includes("almost sorted") ||
      normalizedText.includes("mostly sorted"))
  ) {
    boost += 0.15;
  }

  return boost;
}

async function generateMissingAlgorithmEmbeddings() {
  const result = await pool.query(
    "SELECT id, name, description FROM algorithms WHERE embedding IS NULL"
  );

  for (const algorithm of result.rows) {
    const text = `${algorithm.name}: ${algorithm.description}`;
    const embedding = await embeddingsModel.embedQuery(text);

    await pool.query("UPDATE algorithms SET embedding = $1 WHERE id = $2", [
      JSON.stringify(embedding),
      algorithm.id,
    ]);
  }
}

async function findRelevantAlgorithms(question) {
  await generateMissingAlgorithmEmbeddings();

  const questionEmbedding = await embeddingsModel.embedQuery(question);

  const result = await pool.query(
    "SELECT id, name, description, embedding FROM algorithms WHERE embedding IS NOT NULL"
  );

  return result.rows
    .map((algorithm) => {
      const embedding =
        typeof algorithm.embedding === "string"
          ? JSON.parse(algorithm.embedding)
          : algorithm.embedding;

      return {
        name: algorithm.name,
        description: algorithm.description,
        score: cosineSimilarity(questionEmbedding, embedding) + keywordBoost(question, algorithm),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

/**
 * @swagger
 * /ai/ask:
 *   post:
 *     summary: Ask a RAG-based AI assistant about sorting algorithms
 *     tags:
 *       - AI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Which sorting algorithm is adaptive and has O(n) best-case time complexity?"
 *     responses:
 *       200:
 *         description: RAG-based answer generated successfully
 *       400:
 *         description: Invalid input - question is required
 *       500:
 *         description: AI service error
 */
app.post("/ai/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        error: "Question is required",
      });
    }

    const relevantAlgorithms = await findRelevantAlgorithms(question);

    const context = relevantAlgorithms
      .map((algorithm) => {
        return `Algorithm: ${algorithm.name}\nDescription: ${algorithm.description}`;
      })
      .join("\n\n");

    const response = await model.invoke(`
You are an AI algorithm learning assistant.

Answer the user's question using the provided algorithm context.
Always consider all algorithms from the context before choosing the best answer.
Do not say that an algorithm is missing if it appears in the context.
If multiple algorithms are relevant, compare them briefly.

Context:
${context}

User question:
${question}

Return the answer in Markdown.
`);

    res.json({
      answer: response.content,
      sources: relevantAlgorithms.map((algorithm) => ({
        name: algorithm.name,
        similarity: Number(algorithm.score.toFixed(4)),
      })),
    });
  } catch (error) {
    console.error("RAG assistant error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
});

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(5000, () => {
      console.log("Backend works at http://localhost:5000");
    });
  } catch (error) {
    console.error("Failed to initialize backend:", error);
    process.exit(1);
  }
}

startServer();
