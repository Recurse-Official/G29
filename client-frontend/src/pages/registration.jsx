import React, { useState } from "react";

const Registration = ({ onRegistrationSuccess }) => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");

  const handleCreatePassword = () => {
    setShowPasswordFields(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReenterPasswordChange = (e) => {
    setReenteredPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (password === reenteredPassword) {
      alert("Registration successful!");
      onRegistrationSuccess(); 
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Setter Registration</h1>
        {!showPasswordFields ? (
          <>
            <input
              type="text"
              placeholder="SetterID"
              className="w-full mb-4 p-3 border rounded text-lg"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full mb-4 p-3 border rounded text-lg"
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-4 p-3 border rounded text-lg"
            />
            <button
              onClick={handleCreatePassword}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 text-lg"
            >
              Create Password
            </button>
          </>
        ) : (
          <>
            <input
              type="password"
              placeholder="Create Password"
              className="w-full mb-4 p-3 border rounded text-lg"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              className="w-full mb-4 p-3 border rounded text-lg"
              value={reenteredPassword}
              onChange={handleReenterPasswordChange}
            />
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 text-lg"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;
