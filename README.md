# AlgorithmLab — React + Node.js

The project demonstrates the operation of selected algorithms through interactive visualization.

Its goal is to showcase practical knowledge of algorithms and the ability to implement them in a full-stack application.

Additionally, it integrates Large Language Models (LLMs) through LangChain and OpenAI to generate educational explanations and interview preparation content for users.

## 🛠 Technologies

- **Frontend:** React + Vite
  - `React` — a library for building user interfaces
  - `Vite` — a fast bundler and development server for frontend projects
  - `React Router` — handling navigation and routing between different pages/components

- **Backend:** Node.js + Express
  - `Node.js` — a JavaScript runtime environment for server-side development
  - `Express` — a framework for building APIs and handling HTTP requests
  - `CORS` — middleware that allows communication between frontend and backend running on different ports
  - `Swagger UI` — interactive REST API documentation
  - `swagger-jsdoc` — OpenAPI specification generation from JSDoc comments

- **Database:** PostgreSQL
  - `PostgreSQL` — relational database used to store algorithm descriptions

- **DevOps:** Docker & Docker Compose
  - `Docker` — containerization platform
  - `Docker Compose` — orchestration of frontend, backend and database containers

## 🤖 AI-Powered Algorithm Explanations

AlgorithmLab includes an AI-powered educational assistant built with LangChain and OpenAI.

Users can generate detailed explanations for each implemented sorting algorithm directly from the visualization page.

### Features

- AI-generated algorithm explanations
- Step-by-step analysis of the provided input array
- Time and space complexity discussion
- Practical use cases
- Interview preparation questions
- Markdown-formatted responses

### Technology Stack

- **LangChain** – orchestration layer for LLM interactions
- **OpenAI GPT-4o Mini** – explanation generation
- **React Markdown** – rendering AI-generated Markdown content
- **Express.js** – backend API integration

### Example Workflow

1. User enters a custom array.
2. User runs the sorting visualization.
3. User clicks **"🤖 Explain with AI"**.
4. Backend sends the algorithm name and input array to OpenAI through LangChain.
5. AI generates:
   - algorithm overview,
   - execution walkthrough,
   - complexity analysis,
   - practical applications,
   - interview questions.
6. Response is displayed in formatted Markdown inside the application.

### Supported Algorithms

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

### Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key
```

The application uses the OpenAI API through LangChain to generate educational content dynamically.

## 📂 Project Structure

```ascii
AlgorithmLab/
│
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ BubbleSortVisualizer.jsx
│  │  │  ├─ HeapSortVisualizer.jsx
│  │  │  ├─ InsertionSortVisualizer.jsx
│  │  │  ├─ MergeSortVisualizer.jsx
│  │  │  ├─ QuickSortVisualizer.jsx
│  │  │  └─ SelectionSortVisualizer.jsx
│  │  │
│  │  ├─ pages/
│  │  │  └─ Home.jsx
│  │  │
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  │
│  ├─ Dockerfile
│  ├─ package.json
│  └─ vite.config.js
│
├─ backend/
│  ├─ algorithms/
│  │  ├─ bubbleSort.js
│  │  ├─ heapSort.js
│  │  ├─ insertionSort.js
│  │  ├─ mergeSort.js
│  │  ├─ quickSort.js
│  │  └─ selectionSort.js
│  │
│  ├─ db.js
│  ├─ init.sql
│  ├─ server.js
│  ├─ Dockerfile
│  └─ package.json
│
├─ docker-compose.yml
├─ .gitignore
├─ .prettierrc
├─ .prettierignore
├─ eslint.config.js
└─ README.md
```

### Project Architecture

```text
Frontend (React + Vite)
          │
          ▼
Backend (Node.js + Express)
          │
   ┌──────┴──────┐
   ▼             ▼
PostgreSQL    OpenAI API
                ▲
                │
           LangChain
```

The frontend communicates with the backend through REST APIs.
The backend executes sorting algorithms, retrieves algorithm descriptions from PostgreSQL, and returns data to the frontend.
Docker Compose orchestrates all application services.

## 🌐 Routing in React

- The frontend uses React Router to handle navigation between pages.

- `/` → Home page
- `/insertion-sort` → Insertion Sort Visualizer
- `/bubble-sort` → Bubble Sort Visualizer
- `/selection-sort` → Selection Sort Visualizer
- `/merge-sort` → Merge Sort Visualizer
- `/quick-sort` → Quick Sort Visualizer
- `/heap-sort` → Heap Sort Visualizer

- Each algorithm will eventually have its own route and visualizer component.

This approach allows multiple pages without reloading the browser, which is standard in modern single-page applications (SPA).

## 🔗 Backend Endpoints

The backend provides `REST` endpoints for handling sorting and descriptions:

- `GET /`
  - **Test endpoint**, returns _AlgorithmLab backend is running_

- `POST /sort/insertion`
  - Receives `JSON { array: [5,2,4,3] }`
  - Returns the sorting steps and the sorted array

- `GET /algorithms/:name`
  - Returns algorithm metadata and description from PostgreSQL

- `POST /ai/explain`
  - Receives algorithm name and input array
  - Generates AI-powered explanation using LangChain and OpenAI

Example:

```bash
GET /algorithms/BubbleSort
GET /algorithms/InsertionSort
GET /algorithms/QuickSort
```

```bash
POST /ai/explain
```

```json
{
  "algorithm": "QuickSort",
  "array": [5, 2, 4, 3, 1]
}
```

Rest of endpoints works in similar way:

```bash
POST /sort/bubble
POST /sort/selection
POST /sort/merge
POST /sort/quick
POST /sort/heap
```

### API Documentation

Interactive API documentation is available through Swagger UI:

```text
http://localhost:5000/api-docs
```

## 🐘 PostgreSQL Integration

Algorithm descriptions are stored in a PostgreSQL database running in Docker.

The backend connects to PostgreSQL using the `pg` package and exposes a REST endpoint:

```bash
GET /algorithms/:name
```

Example:

```bash
GET /algorithms/QuickSort
```

Response:

```json
{
  "id": 5,
  "name": "QuickSort",
  "description": "Quick Sort is a sorting algorithm..."
}
```

Database initialization is handled automatically using:

```text
backend/init.sql
```

which creates the `algorithms` table and inserts default descriptions for all supported algorithms.

## 🐳 Docker Setup

The application runs using Docker Compose and consists of three containers:

- Frontend (React + Vite)
- Backend (Node.js + Express)
- PostgreSQL

Architecture:

```text
Frontend (React)
       │
       ▼
Backend (Express API)
       │
   ┌───┴────┐
   ▼        ▼
PostgreSQL  OpenAI API
             ▲
             │
        LangChain
```

Start the entire application:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

## 🖼️ Favicon

The application’s avatar (favicon) was generated using `Craion`, an AI-powered tool that creates images based on short text prompts. Craion uses generative models to produce graphics in various styles, making it easy to generate simple illustrations, icons, or visual concepts. The image used in this project was created specifically for the application and does not depict any real persons or objects.

## ✨ Features

- Interactive visualization of sorting algorithms
- AI-powered algorithm explanations using `OpenAI` and `LangChain`
- Algorithm walkthroughs for user-provided arrays
- AI-generated interview questions
- Markdown-rendered educational content
- Step-by-step execution
- Automatic playback mode
- Previous / Next step navigation
- Dynamic algorithm descriptions from PostgreSQL
- Dockerized frontend, backend, and database
- Responsive UI built with Bootstrap
- Multiple sorting algorithms:
  - Bubble Sort
  - Insertion Sort
  - Selection Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
- PostgreSQL-backed algorithm descriptions
- REST API for algorithm metadata
- Interactive API documentation with Swagger UI
- Docker Compose local environment
- Home navigation shortcut in navbar

## 🏃‍♂️ Running the project

Start the entire application:

```bash
docker compose up --build
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

Swagger UI:

```text
http://localhost:5000/api-docs
```

PostgreSQL:

```text
localhost:5432
```

## 🎨 Code Formatting

This project uses **Prettier** to maintain consistent code style across the frontend and backend.

### Format all files

From the project root directory run:

```bash
npm run format
```

### Check formatting without modifying files

```bash
npm run format:check
```

### Configuration

Prettier configuration is stored in:

```text
.prettierrc
.prettierignore
```

Formatting is applied to the entire project, including:

- Frontend (React + Vite)
- Backend (Node.js + Express)
- Configuration files
- Documentation files

## 🔍 Code Linting

This project uses **ESLint** to detect potential issues and enforce code quality standards.

### Run lint checks

From the project root directory run:

```bash
npm run lint
```

### Automatically fix lint issues

```bash
npm run lint:fix
```

### What ESLint checks

- React Hooks rules
- JavaScript best practices
- Unused variables
- Potential code quality issues
- Consistent coding patterns

## ✅ Code Quality

- ESLint static code analysis
- Prettier code formatting
- Consistent coding style
- Modular project structure
- React Hooks linting
- Automated formatting scripts
