import { Link } from "react-router-dom";

const algorithms = [
  {
    name: "Insertion Sort",
    path: "/insertion-sort",
    complexity: "O(n²)",
    level: "Beginner",
    description: "Great for understanding how sorted sections are built step by step.",
    color: "primary",
  },
  {
    name: "Bubble Sort",
    path: "/bubble-sort",
    complexity: "O(n²)",
    level: "Beginner",
    description: "A simple comparison-based algorithm useful for learning swaps.",
    color: "success",
  },
  {
    name: "Selection Sort",
    path: "/selection-sort",
    complexity: "O(n²)",
    level: "Beginner",
    description: "Shows how repeated minimum selection works in practice.",
    color: "info",
  },
  {
    name: "Merge Sort",
    path: "/merge-sort",
    complexity: "O(n log n)",
    level: "Intermediate",
    description: "A divide-and-conquer algorithm with predictable performance.",
    color: "warning",
  },
  {
    name: "Quick Sort",
    path: "/quick-sort",
    complexity: "O(n log n)",
    level: "Intermediate",
    description: "A fast partition-based algorithm commonly discussed in interviews.",
    color: "danger",
  },
  {
    name: "Heap Sort",
    path: "/heap-sort",
    complexity: "O(n log n)",
    level: "Intermediate",
    description: "Uses a heap structure to repeatedly extract the largest element.",
    color: "secondary",
  },
];

function Home() {
  return (
    <div className="container py-5">
      <section className="text-center mb-5">
        <span className="badge bg-dark mb-3">Algorithm Visualizer + AI Assistant</span>

        <h1 className="display-4 fw-bold mb-3">Learn algorithms visually</h1>

        <p className="lead text-muted mx-auto" style={{ maxWidth: "760px" }}>
          AlgorithmLab helps you understand sorting algorithms through step-by-step visualizations,
          custom input arrays, and AI-generated explanations powered by LangChain and OpenAI.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
          <a href="#algorithms" className="btn btn-primary btn-lg">
            Explore algorithms
          </a>

          <Link to="/ai-assistant" className="btn btn-success btn-lg">
            Ask AI Assistant
          </Link>

          <a
            href="http://localhost:5000/api-docs"
            className="btn btn-outline-dark btn-lg"
            target="_blank"
            rel="noreferrer"
          >
            View API docs
          </a>
        </div>
      </section>

      <section className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="fw-bold">📊 Step-by-step visualization</h5>
              <p className="text-muted mb-0">
                Follow each comparison, swap, partition, merge, or heap operation in a clear visual
                format.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="fw-bold">🤖 AI-powered explanations</h5>
              <p className="text-muted mb-0">
                Generate beginner-friendly explanations, complexity analysis, use cases, and
                interview questions.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="fw-bold">🧪 Full-stack architecture</h5>
              <p className="text-muted mb-0">
                React frontend, Express backend, PostgreSQL descriptions, Docker setup, Swagger
                docs, and CI checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="row text-center g-3">
          <div className="col-md-3">
            <div className="p-3 bg-light rounded shadow-sm">
              <h3 className="fw-bold mb-0">6</h3>
              <small className="text-muted">Algorithms</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 bg-light rounded shadow-sm">
              <h3 className="fw-bold mb-0">AI</h3>
              <small className="text-muted">Explanations</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 bg-light rounded shadow-sm">
              <h3 className="fw-bold mb-0">REST</h3>
              <small className="text-muted">API</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 bg-light rounded shadow-sm">
              <h3 className="fw-bold mb-0">CI</h3>
              <small className="text-muted">GitHub Actions</small>
            </div>
          </div>
        </div>
      </section>

      <section id="algorithms">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Choose an algorithm</h2>
          <p className="text-muted">
            Start with a simple algorithm or explore more advanced divide-and-conquer methods.
          </p>
        </div>

        <div className="row g-4">
          {algorithms.map((algorithm) => (
            <div className="col-md-4" key={algorithm.name}>
              <Link to={algorithm.path} className="text-decoration-none">
                <div className="card h-100 shadow-sm algorithm-card">
                  <div className={`card-header bg-${algorithm.color} text-white fw-bold`}>
                    {algorithm.name}
                  </div>

                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="badge bg-light text-dark">{algorithm.level}</span>
                      <span className="badge bg-dark">{algorithm.complexity}</span>
                    </div>

                    <p className="text-muted mb-0">{algorithm.description}</p>
                  </div>

                  <div className="card-footer bg-white border-0">
                    <span className="text-primary fw-semibold">Open visualizer →</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
