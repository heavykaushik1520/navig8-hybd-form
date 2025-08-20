import React from "react";
import VisitorForm from "./page/VisitorForm";
import SuccessPage from "./page/SuccessPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VisitorForm />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
