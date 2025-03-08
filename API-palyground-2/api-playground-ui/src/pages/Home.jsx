import React, { useState, useEffect } from "react";
import axios from "axios";
import MockAPIForm from "../components/MockAPIForm";
import MockAPIList from "../components/MockAPIList";

const localhost = "http://localhost:5001";

const Home = () => {
  const [mockAPIs, setMockAPIs] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchMockAPIs();
  }, []);

  const fetchMockAPIs = async () => {
    try {
      const res = await axios.get(`${localhost}/mock-apis`);
      setMockAPIs(res.data);
    } catch (error) {
      console.error("Error fetching APIs:", error);
    }
  };

  const createMockAPI = async (data) => {
    setError("");
    setSuccessMessage("");

    const { path, method, response, requestBody } = data;

    try {
      await axios.post(`${localhost}/create-mock`, {
        method: method.toUpperCase(),
        path,
        response,
        requestBody,
      });

      setSuccessMessage(`Mock API created: ${method.toUpperCase()} ${path}`);
      fetchMockAPIs(); // Fetch updated list after creation
    } catch (error) {
      console.error("Error creating mock API:", error);
      setError(error.response?.data?.error || "Failed to create mock API");
    }
  };

  const deleteMockAPI = async (path, method) => {
    try {
      await axios.delete(`${localhost}/delete-mock`, {
        data: { path, method },
      });

      setSuccessMessage(`Mock API deleted: ${method.toUpperCase()} ${path}`);
      fetchMockAPIs(); // Refresh UI after deletion
    } catch (error) {
      console.error("Error deleting mock API:", error);
      setError(error.response?.data?.error || "Failed to delete mock API");
    }
  };

  return (
    <div className="container">
      <h1>API Playground</h1>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {successMessage && <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>}

      <MockAPIForm onCreate={createMockAPI} />
      <MockAPIList mockAPIs={mockAPIs} onDelete={deleteMockAPI} />
    </div>
  );
};

export default Home;
