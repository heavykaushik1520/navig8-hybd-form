import React from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 text-center" style={{ maxWidth: "600px" }}>
        <h1 className="mb-2 fw-bold">
          Navig8 Vision Directory 
        </h1>
         <h1 className="mb-2 fw-bold">
          Day 1
        </h1>

        <p className="mb-4 fs-5">
          Directory details submitted successfully.
        </p>
        <button
          onClick={handleRedirect}
          className="btn btn-primary fw-bold px-4"
        >
          Submit Another Response
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
