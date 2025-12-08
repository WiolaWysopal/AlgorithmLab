import { useState, useEffect } from "react";

function InsertionSortVisualizer() {
  const [array, setArray] = useState([5, 2, 4, 3, 1]);
  const [inputValue, setInputValue] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // --- WYLICZANIE SKALOWANEJ WYSOKOŚCI ---
  const minValue = Math.min(...array);
  const maxValue = Math.max(...array);

  const minHeight = 30;  
  const maxHeight = 200; 

  const getHeight = (value) => {
    if (maxValue === minValue) return (minHeight + maxHeight) / 2;

    const normalized = (value - minValue) / (maxValue - minValue);
    return minHeight + normalized * (maxHeight - minHeight);
  };

  // --- USTAWIANIE WŁASNEJ TABLICY ---
  const handleSetArray = () => {
    if (!inputValue.trim()) return;

    const parsed = inputValue
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((n) => !isNaN(n));

    if (parsed.length === 0) {
      alert("Enter valid numbers, separated by commas.");
      return;
    }

    setArray(parsed);
    setSteps([]);
    setCurrentStep(0);
  };

  // --- SORTOWANIE ---
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

  // --- WIZUALIZACJA KROKÓW ---
  useEffect(() => {
    if (steps.length === 0) return;

    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setArray(steps[currentStep]);
        setCurrentStep(currentStep + 1);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [steps, currentStep]);

  // --- RESPONSYWNA SZEROKOŚĆ KAFELKA ---
  const getBarWidth = () => {
    // max 60px, minimalnie ok. 15px gdy dużo elementów
    return Math.min(60, Math.max(15, 300 / array.length));
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Insertion Sort Visualizer</h2>

        {/* --- INPUT + PRZYCISK (RESPONSYWNE) --- */}
        <div className="mb-4">
          <label className="form-label fw-bold">Enter numbers (e.g. 5,2,4,3,1):</label>

          {/* input-group nie lubi wrap, więc robimy responsywny układ ręcznie */}
          <div className="d-flex flex-column flex-sm-row gap-2">
            <input
              type="text"
              className="form-control w-75"
              placeholder="np. 10, 3, 7, 1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSetArray}>
              Set Array
            </button>
          </div>
        </div>

        {/* --- KAFELKI (PEŁNA RESPONSYWNOŚĆ) --- */}
        <div
          className="d-flex justify-content-center gap-3 mb-4 align-items-end"
          style={{ flexWrap: "wrap" }}  // <-- kluczowe
        >
          {array.map((value, idx) => (
            <div
              key={idx}
              className="bg-primary text-white d-flex justify-content-center align-items-end"
              style={{
                height: `${getHeight(value)}px`,
                width: `${getBarWidth()}px`,
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
                transition: "height 0.3s ease-in-out",
              }}
            >
              {value}
            </div>
          ))}
        </div>

        {/* --- PRZYCISK SORTOWANIA --- */}
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
