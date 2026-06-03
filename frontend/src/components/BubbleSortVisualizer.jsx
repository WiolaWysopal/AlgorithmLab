import { useState, useEffect } from "react";

function BubbleSortVisualizer() {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [initialArray, setInitialArray] = useState([5, 2, 4, 3, 1]);
  const [array, setArray] = useState([5, 2, 4, 3, 1]);
  const [inputValue, setInputValue] = useState("");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [description, setDescription] = useState(""); // opis algorytmu

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
  const getBarWidth = () => Math.min(60, Math.max(15, 300 / array.length));

  // --- POBIERANIE OPISU Z DB (Postgre) ---
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const res = await fetch("http://localhost:5000/algorithms/BubbleSort");

        if (!res.ok) {
          setDescription("No description in the database");
          return;
        }

        const data = await res.json();
        setDescription(data.description || "No description in the database");
      } catch (err) {
        console.error("Unexpected error fetching description:", err);
        setDescription("No description in the database");
      }
    };

    fetchDescription();
  }, []);

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

    setInitialArray(parsed); // 🔹 zapamiętujemy oryginał
    setArray(parsed);
    setSteps([]);
    setCurrentStep(0);
    setIsAutoPlaying(false);
  };

  // --- SORTOWANIE ---
  const handleSort = async () => {
    setArray(initialArray);
    setSteps([]);
    setCurrentStep(0);
    setIsAutoPlaying(false); // 🔹 domyślnie tryb ręczny

    const res = await fetch("http://localhost:5000/sort/bubble", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ array: initialArray }),
    });

    const data = await res.json();
    setSteps(data.steps);

    // pokazujemy pierwszy krok
    if (data.steps.length > 0) {
      setArray(data.steps[0].array);
      setCurrentStep(1);
    }
  };

  const handleNextStep = () => {
    if (currentStep >= steps.length) return;

    setArray(steps[currentStep].array);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStep <= 1) return;

    const prevIndex = currentStep - 2;
    setArray(steps[prevIndex].array);
    setCurrentStep(prevIndex + 1);
  };

  const handleRefresh = () => {
    setIsAutoPlaying(false);
    setArray(initialArray);
    setSteps([]);
    setCurrentStep(0);
  };

  // --- WIZUALIZACJA KROKÓW ---
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (steps.length === 0) return;
    if (currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setArray(steps[currentStep].array);
      setCurrentStep((prev) => prev + 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, steps, currentStep]);

  const activeStep = steps[currentStep - 1];

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">BubbleSort Visualizer</h2>

        {/* --- OPIS ALGORYTMU --- */}
        {description && (
          <div className="mb-2">
            <p className="text-secondary fw-medium fst-italic">{description}</p>
          </div>
        )}

        {/* --- INPUT + PRZYCISK --- */}
        <div className="mb-4">
          <label className="form-label fw-bold">Enter numbers (e.g. 5,2,4,3,1):</label>
          <div className="d-flex flex-column flex-sm-row gap-2">
            <input
              type="text"
              className="form-control w-75"
              placeholder="e.g. 10, 3, 7, 1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSetArray}>
              Set Array
            </button>
          </div>
        </div>

        {/* --- KAFELKI (PEŁNA RESPONSYWNOŚĆ) --- */}
        <div className="d-flex justify-content-center gap-3 mb-4 align-items-end flex-wrap">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`text-white d-flex justify-content-center align-items-end ${
                activeStep?.sorted
                  ? "bg-success"
                  : activeStep?.swappedIndexes?.includes(idx)
                    ? "bg-danger"
                    : activeStep?.comparing?.includes(idx)
                      ? "bg-warning"
                      : "bg-primary"
              }`}
              style={{
                height: `${getHeight(value)}px`,
                width: `${getBarWidth()}px`,
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
                transition: "height 0.3s ease-in-out, background-color 0.3s ease-in-out",
              }}
            >
              {value}
            </div>
          ))}
        </div>
        {activeStep?.message && (
          <div className="text-center mb-3">
            <strong>{activeStep.message}</strong>
          </div>
        )}

        {/* KROKI SORTOWANIA */}

        <div className="text-center mb-2">
          <strong>Step:</strong> {currentStep} / {steps.length}
        </div>

        {/* --- PRZYCISK SORTOWANIA --- */}
        <div className="text-center d-flex justify-content-center gap-3">
          <button className="btn btn-success" onClick={handleSort}>
            Start Sorting
          </button>

          <button className="btn btn-outline-secondary" onClick={handleRefresh}>
            Refresh
          </button>
        </div>

        <div className="text-center d-flex justify-content-center gap-2 mt-3 flex-wrap">
          <button
            className="btn btn-outline-primary"
            onClick={handlePrevStep}
            disabled={currentStep <= 1}
          >
            ⏮ Previous
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={handleNextStep}
            disabled={currentStep >= steps.length}
          >
            Next ⏭
          </button>

          <button
            className="btn btn-outline-success"
            onClick={() => setIsAutoPlaying(currentStep < steps.length)}
            disabled={isAutoPlaying || steps.length === 0 || currentStep >= steps.length}
          >
            ▶ Auto
          </button>

          <button className="btn btn-outline-danger" onClick={() => setIsAutoPlaying(false)}>
            ⏸ Pause
          </button>
        </div>
      </div>
    </div>
  );
}

export default BubbleSortVisualizer;
