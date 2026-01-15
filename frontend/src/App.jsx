import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InsertionSortVisualizer from "./components/InsertionSortVisualizer";
import BubbleSortVisualizer from "./components/BubbleSortVisualizer";
import SelectionSortVisualizer from "./components/SelectionSortVisualizer";
import MergeSortVisualizer from "./components/MergeSortVisualizer";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark w-100">
        <h1 className="text-center w-100 display-5"
          style={{
            color: "white",
            padding: "1rem 0",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            letterSpacing: "2px"
          }}>
          AlgorithmLab
        </h1>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insertion-sort" element={<InsertionSortVisualizer />} />
        <Route path="/bubble-sort" element={<BubbleSortVisualizer />} />
        <Route path="/selection-sort" element={<SelectionSortVisualizer/>}/>
        <Route path="/merge-sort" element={<MergeSortVisualizer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
