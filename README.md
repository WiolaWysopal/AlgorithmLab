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

## 🤖 AI-Powered Learning Assistant

AlgorithmLab includes an AI-powered educational assistant built with LangChain and OpenAI.

Users can generate detailed explanations for each implemented sorting algorithm directly from the visualization page.

### Features

- AI-generated algorithm explanations
- AI-generated quizzes for self-assessment
- RAG-based AI assistant for algorithm questions
- OpenAI embeddings for semantic search
- PostgreSQL-stored algorithm knowledge base
- Source attribution for AI-generated answers
- Step-by-step analysis of the provided input array
- Time and space complexity discussion
- Practical use cases
- Interview preparation questions
- Knowledge-check questions with answers
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

### AI Quiz Generator

AlgorithmLab includes an AI-powered quiz generator that helps users verify their understanding of sorting algorithms.

Users can generate quizzes directly from the visualization page after exploring an algorithm.

### Quiz Features

- AI-generated knowledge checks
- Algorithm-specific questions
- Multiple difficulty levels
- Answer explanations
- Interview-style questions
- Markdown-formatted output

### Quiz Workflow

1. User explores a sorting algorithm.
2. User clicks **"🧠 Generate Quiz"**.
3. Backend sends the algorithm name and input array to OpenAI through LangChain.
4. AI generates:
   - multiple-choice questions,
   - conceptual questions,
   - complexity-related questions,
   - practical scenario questions,
   - answer explanations.
5. Quiz is displayed directly in the application.

### RAG-Based AI Algorithm Assistant

AlgorithmLab includes a Retrieval-Augmented Generation (RAG) assistant that answers natural language questions about sorting algorithms.

The assistant uses algorithm descriptions stored in PostgreSQL as a knowledge base. For each algorithm, the backend generates OpenAI embeddings and stores them in the database. When a user asks a question, the system creates an embedding for the question, compares it with stored algorithm embeddings using cosine similarity, retrieves the most relevant algorithm descriptions, and sends them as context to the LLM through LangChain.

### RAG Features

- Natural language question answering
- OpenAI embeddings
- Semantic search over algorithm descriptions
- PostgreSQL-based knowledge storage
- Cosine similarity retrieval
- LangChain-powered answer generation
- Source attribution with similarity scores
- Markdown-rendered AI responses

### RAG Workflow

1. User asks a question in the AI Assistant page.
2. Backend generates an embedding for the question.
3. Stored algorithm embeddings are retrieved from PostgreSQL.
4. Cosine similarity is used to find the most relevant algorithm descriptions.
5. Retrieved descriptions are passed as context to the LLM.
6. The model generates a grounded answer.
7. The frontend displays the answer together with retrieved sources.

Example question:

```text
Which sorting algorithm is adaptive and has O(n) best-case time complexity?
```

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
│  │  │  ├─ AiAssistant.jsx
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
│  ├─ swagger.js
│  ├─ Dockerfile
│  └─ package.json
│
├─ k8s/
│  ├─ namespace.yaml
│  ├─ configmap.yaml
│  ├─ secret.example.yaml
│  ├─ postgres-pvc.yaml
│  ├─ postgres-deployment.yaml
│  ├─ postgres-service.yaml
│  ├─ backend-deployment.yaml
│  ├─ backend-service.yaml
│  ├─ frontend-deployment.yaml
|  ├─ ingress.yaml
│  └─ frontend-service.yaml
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
   ┌──────┼────────────┬────────────┐
   ▼      ▼            ▼            ▼
PostgreSQL Cache   OpenAI API   Swagger UI
   │                   ▲
   │                   │
   ├─ algorithm data   │
   ├─ embeddings       │
   └─ AI history       │
                       │
                  LangChain
```

The frontend communicates with the backend through REST APIs.
The backend executes sorting algorithms, retrieves algorithm descriptions from PostgreSQL, and returns data to the frontend.
Docker Compose orchestrates all application services.

## ⚡ AI Performance Optimizations

To improve response times and reduce unnecessary OpenAI API calls, AlgorithmLab includes several backend optimizations.

### Shared OpenAI Model Instance

The LangChain `ChatOpenAI` client is initialized once during server startup and reused across all requests.

Benefits:

- lower request overhead
- reduced object creation cost
- faster response generation

### In-Memory AI Cache

Generated explanations are cached using a JavaScript `Map`.

When a user requests an explanation for the same algorithm and input array, the backend returns the cached response instead of calling OpenAI again.

Example cache key:

```text
QuickSort:5,2,4,3,1
```

Workflow:

1. User requests an AI explanation.
2. Backend generates a cache key from the algorithm name and input array.
3. If the explanation already exists in cache:
   - cached response is returned immediately.
4. Otherwise:
   - OpenAI generates a new explanation,
   - the response is stored in cache,
   - the generated explanation is returned to the user.

Benefits:

- significantly faster repeated requests
- reduced OpenAI API usage
- lower operational costs
- improved user experience

## 🧠 AI Assistant Features

The AI Assistant combines Retrieval-Augmented Generation (RAG), semantic search, and conversation persistence.

### RAG Pipeline

1. User submits a question.
2. OpenAI embeddings are generated for the question.
3. Algorithm descriptions stored in PostgreSQL are compared using cosine similarity.
4. The most relevant algorithms are selected as context.
5. LangChain and OpenAI generate a grounded response.
6. Retrieved sources are returned together with similarity scores.

### Conversation History

Every AI Assistant interaction is stored in PostgreSQL.

Stored information:

- User question
- Generated answer
- Retrieved sources
- Timestamp

Recent conversations can be retrieved through:

```http
GET /ai/conversations
```

## 🌐 Routing in React

- The frontend uses React Router to handle navigation between pages.

- `/` → Home page
- `/insertion-sort` → Insertion Sort Visualizer
- `/bubble-sort` → Bubble Sort Visualizer
- `/selection-sort` → Selection Sort Visualizer
- `/merge-sort` → Merge Sort Visualizer
- `/quick-sort` → Quick Sort Visualizer
- `/heap-sort` → Heap Sort Visualizer
- `/ai-assistant` → RAG-based AI Algorithm Assistant

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

- `POST /ai/quiz`
  - Receives algorithm name and input array
  - Generates an AI-powered quiz using LangChain and OpenAI

- `POST /ai/ask`
  - Receives a natural language question about sorting algorithms
  - Generates a RAG-based answer using OpenAI embeddings, semantic search, PostgreSQL-stored algorithm knowledge, and LangChain
  - Returns the answer with retrieved sources and similarity scores

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
POST /ai/explain
POST /ai/quiz
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
Frontend (React + Vite)
          │
          ▼
Backend (Node.js + Express)
          │
   ┌──────┼────────────┬────────────┐
   ▼      ▼            ▼            ▼
PostgreSQL Cache   OpenAI API   Swagger UI
   │                   ▲
   │                   │
   ├─ algorithm data   │
   ├─ embeddings       │
   └─ AI history       │
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

## ⚙️ CI / GitHub Actions

This project uses GitHub Actions to automatically run quality checks on push and pull requests.

The workflow checks:

- dependency installation
- Prettier formatting
- ESLint code quality
- frontend production build

Workflow file:

```text
.github/workflows/quality-checks.yml
```

## ☸️ Kubernetes Local Deployment

The application can also be tested locally using Kubernetes through Docker Desktop Kubernetes or Minikube.

This setup includes:

- Frontend Deployment and Service
- Backend Deployment and Service
- PostgreSQL Deployment and Service
- PersistentVolumeClaim (PVC) for PostgreSQL data persistence
- ConfigMap for application configuration
- Kubernetes Secret for the OpenAI API key
- Namespace isolation for project resources
- NGINX Ingress Controller
- Ingress resource for frontend routing

### 1. Enable Kubernetes

If you use Docker Desktop:

1. Open Docker Desktop
2. Go to **Settings → Kubernetes**
3. Enable **Kubernetes**
4. Click **Apply & Restart**

### 2. Build local Docker images

From the project root directory run:

```bash
docker build -t algorithmlab-backend:latest ./backend
docker build -t algorithmlab-frontend:latest ./frontend
```

### 3. Create a local Kubernetes secret

Create a local file:

`k8s/secret.yaml`

Example:

```yml
apiVersion: v1
kind: Secret
metadata:
  name: algorithmlab-secret
  namespace: algorithmlab
type: Opaque
stringData:
  OPENAI_API_KEY: your_real_openai_api_key
```

This file contains a real API key and should not be committed.

Add it to `.gitignore`:

`k8s/secret.yaml`

The repository should only include:

`k8s/secret.example.yaml`

### 4. Apply Kubernetes manifests

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/postgres-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

### 5. Check Kubernetes resources

```bash
kubectl get pods -n algorithmlab
kubectl get services -n algorithmlab
```

### 6. PostgreSQL Persistent Storage

AlgorithmLab uses a `PersistentVolumeClaim` (PVC) to persist PostgreSQL data across pod restarts and redeployments.

Check the PVC status:

```bash
kubectl get pvc -n algorithmlab
```

Expected output:

```text
NAME           STATUS   CAPACITY
postgres-pvc   Bound    1Gi
```

A `Bound` status indicates that PostgreSQL storage has been successfully provisioned and attached to the database pod.

This ensures that database data survives:

- PostgreSQL pod restarts
- Deployment rollouts
- Kubernetes pod recreation events

### 7. Access the application

If NodePort works correctly:

`http://localhost:30080`

If not, use port forwarding.

Frontend:

```bash
kubectl port-forward service/frontend-service 5173:5173 -n algorithmlab
```

Then open:

`http://localhost:5173`

Backend:

```bash
kubectl port-forward service/backend-service 5000:5000 -n algorithmlab
```

Then open:

`http://localhost:5000/api-docs`

This allows the full application to be tested locally on Kubernetes without deploying it to AWS.

### 8. Access via Ingress

Add the following entry to your hosts file:

```text
127.0.0.1 algorithmlab.local
```

Then access the application through:

`http://algorithmlab.local`

## 🖼️ Favicon

The application’s avatar (favicon) was generated using `Craion`, an AI-powered tool that creates images based on short text prompts. Craion uses generative models to produce graphics in various styles, making it easy to generate simple illustrations, icons, or visual concepts. The image used in this project was created specifically for the application and does not depict any real persons or objects.

## ✨ Features

- Interactive visualization of sorting algorithms
- AI-powered algorithm explanations using `OpenAI` and `LangChain`
- AI-powered quiz generation
- AI-generated knowledge checks
- AI-generated interview questions and answers
- In-memory AI caching for explanations and quizzes
- RAG-based AI assistant powered by OpenAI embeddings and LangChain
- Semantic search over algorithm knowledge stored in PostgreSQL
- AI conversation history stored in PostgreSQL
- Retrieval of recent AI assistant conversations
- Source attribution for AI-generated answers
- Algorithm walkthroughs for user-provided arrays
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
- Local Kubernetes deployment configuration
- Kubernetes Deployments, Services, ConfigMaps, Secrets, and PersistentVolumeClaims
- Persistent PostgreSQL storage using PersistentVolumeClaim (PVC)
- Namespace-based resource isolation

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
