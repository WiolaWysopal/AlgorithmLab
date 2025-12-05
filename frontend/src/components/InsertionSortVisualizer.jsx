import { useState, useEffect } from "react";

function InsertionSortVisualizer() {
  const [array, setArray] = useState([5, 2, 4, 3, 1]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSort = async () => {
    const res = await fetch("http://localhost:5000/sort/insertion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ array }),
    });

    const data = await res.json();
    setSteps(data.steps);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (steps.length === 0) return;
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setArray(steps[currentStep]);
        setCurrentStep(currentStep + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [steps, currentStep]);

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Insertion Sort Visualizer</h2>

        <div className="d-flex justify-content-center gap-2 mb-4">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="bg-primary text-white d-flex justify-content-center align-items-end"
              style={{
                height: `${value * 20}px`,
                width: "40px",
                fontWeight: "bold",
              }}
            >
              {value}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="btn btn-success" onClick={handleSort}>
            Start Sorting
          </button>
        </div>
      </div>
    </div>
  );
}

export default InsertionSortVisualizer;
