import { useState, useEffect } from "react";

function InsertionSortDescription() {
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/description/insertion")
      .then(res => res.json())
      .then(data => setDescription(data.text))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow p-4 mb-4">
        <h3>Insertion Sort</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default InsertionSortDescription;
