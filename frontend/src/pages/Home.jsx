import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Choose an Algorithm</h2>

      <div className="row justify-content-center g-4">

        <div className="col-md-3">
          <Link to="/insertion-sort" className="text-decoration-none">
            <div className="card shadow text-center p-4 bg-primary text-white">
              <h4>Insertion Sort</h4>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/bubble-sort" className="text-decoration-none">
            <div className="card shadow text-center p-4 bg-success text-white">
              <h4>Bubble Sort</h4>
            </div>
          </Link>
        </div>

        {/* Tu można dodać kolejne kafelki */}
        <div className="col-md-3">
          <div className="card shadow text-center p-4 bg-secondary text-white">
            <h4>Soon...</h4>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
