import React, { useState, useEffect } from "react";
import axios from "axios";
import MockAPIForm from "../components/MockAPIForm";
import MockAPIList from "../components/MockAPIList";

const Home = () => {
  const [mockAPIs, setMockAPIs] = useState({});
  const [error, setError] = useState(""); // State to store errors
  const [successMessage, setSuccessMessage] = useState(""); // Success feedback

  useEffect(() => {
    fetchMockAPIs();
  }, []);

  const fetchMockAPIs = async () => {
    try {
      const res = await axios.get("http://localhost:5001/mock-apis");
      setMockAPIs(res.data);
    } catch (error) {
      console.error("Error fetching APIs:", error);
    }
  };

  const createMockAPI = async (data) => {
    setError("");
    setSuccessMessage("");

    const { path, method, response } = data;

    if (mockAPIs[path] && mockAPIs[path][method.toUpperCase()]) {
      setError(`Path "${path}" with method "${method.toUpperCase()}" already exists.`);
      return;
    }

    try {
      await axios.post("http://localhost:5001/create-mock", {
        method: method.toUpperCase(),
        path,
        response,
      });
      setSuccessMessage(`Mock API created: ${method.toUpperCase()} ${path}`);
      fetchMockAPIs();
    } catch (error) {
      console.error("Error creating mock API:", error);
      setError(error.response?.data?.error || "Failed to create mock API");
    }
  };

  const deleteMockAPI = async (path, method) => {
    try {
      await axios.delete("http://localhost:5001/delete-mock", {
        data: { path, method },
      });
      fetchMockAPIs();
    } catch (error) {
      console.error("Error deleting mock API:", error);
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
