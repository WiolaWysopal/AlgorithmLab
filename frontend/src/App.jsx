import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import InsertionSortVisualizer from "./components/InsertionSortVisualizer";
import BubbleSortVisualizer from "./components/BubbleSortVisualizer";
import SelectionSortVisualizer from "./components/SelectionSortVisualizer";
import MergeSortVisualizer from "./components/MergeSortVisualizer";
import QuickSortVisualizer from "./components/QuickSortVisualizer";
import HeapSortVisualizer from "./components/HeapSortVisualizer";
import AiAssistant from "./pages/AiAssistant";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark px-4 py-3">
        <div className="container-fluid position-relative">
          <h1
            className="position-absolute start-50 translate-middle-x m-0"
            style={{
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            AlgorithmLab
          </h1>

          <Link to="/ai-assistant" className="me-4 text-white text-decoration-none fw-semibold">
            AI Assistant
          </Link>

          <Link to="/" className="ms-auto text-white text-decoration-none" title="Home">
            <i className="bi bi-house-fill fs-3"></i>
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-assistant" element={<AiAssistant />} />
        <Route path="/insertion-sort" element={<InsertionSortVisualizer />} />
        <Route path="/bubble-sort" element={<BubbleSortVisualizer />} />
        <Route path="/selection-sort" element={<SelectionSortVisualizer />} />
        <Route path="/merge-sort" element={<MergeSortVisualizer />} />
        <Route path="/quick-sort" element={<QuickSortVisualizer />} />
        <Route path="/heap-sort" element={<HeapSortVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;
