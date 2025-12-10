import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// --- KONFIGURACJA SUPABASE Z .ENV ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function InsertionSortVisualizer() {
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

  // --- POBIERANIE OPISU Z SUPABASE (BEZ .single()) ---
  useEffect(() => {
  const fetchDescription = async () => {
    try {
      // pobieramy description i id, aby mieć pewność, że jest w wyniku
      const { data, error } = await supabase
        .from("algorithms")
        .select("id, description, name")
        .eq("name", "InsertionSort");

      if (error) {
        console.error("Error fetching description:", error.message);
        setDescription("No description in the database");
        return;
      }

      if (data && data.length > 0) {
        console.log("Fetched data from Supabase:", data);
        setDescription(data[0].description);
      } else {
        console.warn("No data found for InsertionSort");
        setDescription("No description in the database");
      }
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

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Insertion Sort Visualizer</h2>

        {/* --- OPIS ALGORYTMU --- */}
        {description && (
          <div className="mb-2">
            <p className="text-secondary fw-medium fst-italic">
              {description}
            </p>
          </div>
        )}


        {/* --- INPUT + PRZYCISK --- */}
        <div className="mb-4">
          <label className="form-label fw-bold">
            Enter numbers (e.g. 5,2,4,3,1):
          </label>
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
