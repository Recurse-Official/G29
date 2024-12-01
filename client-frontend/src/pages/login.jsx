import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [enrollmentId, setEnrollmentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (enrollmentId === "test" && password === "password") {
      alert("Login successful!");
      onLoginSuccess(); 
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login Page</h1>
        <input
          type="text"
          placeholder="SetterID"
          className="w-full mb-4 p-3 border rounded text-lg"
          value={enrollmentId}
          onChange={(e) => setEnrollmentId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 text-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
