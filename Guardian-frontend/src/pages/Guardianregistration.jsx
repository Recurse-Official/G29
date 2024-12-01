import React, { useState } from 'react';

const GuardianForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    examType: 'government',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Registration Successful:', formData);
    onRegister(); // Navigate to Login
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="p-6 bg-white rounded-lg shadow-xl border-4 border-gray-300 max-w-lg w-full h-[60vh]">
        <h2 className="text-4xl font-bold mb-4 text-center uppercase">Guardian Registration</h2>

        <form onSubmit={handleSubmit} className="text-lg">
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-10 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-10 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-10 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Exam Type */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Exam Type</label>
            <div className="flex items-center space-x-8">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="examType"
                  value="government"
                  checked={formData.examType === 'government'}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Government</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="examType"
                  value="private"
                  checked={formData.examType === 'private'}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Private</span>
              </label>
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Create Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-10 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400"
              placeholder="Create your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-10 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Register Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-16 rounded-md text-xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuardianForm;
