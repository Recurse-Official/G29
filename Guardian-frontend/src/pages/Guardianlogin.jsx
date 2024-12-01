import React, { useState } from 'react';

const GuardianLogin = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ phone: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login Successful:', loginData);
    onLogin();
  };

  return (
    <div className="max-w-lg mx-auto p-12 bg-white rounded-lg shadow-2xl border-4 border-gray-300">
      <h2 className="text-4xl font-bold mb-6 text-center uppercase">Guardian Login</h2>

      <form onSubmit={handleLogin} className="text-xl">
        {/* Phone */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={loginData.phone}
            onChange={handleChange}
            className="w-full px-6 py-4 border border-gray-400 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full px-6 py-4 border border-gray-400 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Login Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-4 px-12 rounded-md text-2xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuardianLogin;
