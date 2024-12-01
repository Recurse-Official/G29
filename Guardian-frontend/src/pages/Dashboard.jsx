import React, { useState } from 'react';

const Dashboard = ({ onLogout }) => {
  // Mock guardian data
  const [guardianDetails, setGuardianDetails] = useState({
    name: 'Guardian Corp',
    shares: [
      { id: 1, name: 'Share A', status: 'Active', key: 'Key123' },
      { id: 2, name: 'Share B', status: 'Pending', key: 'Key456' },
    ],
  });

  const [newShare, setNewShare] = useState({ name: '', status: '', key: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShare((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddShare = (e) => {
    e.preventDefault();
    if (!newShare.name || !newShare.status || !newShare.key) {
      alert('Please fill all fields.');
      return;
    }

    setGuardianDetails((prev) => ({
      ...prev,
      shares: [...prev.shares, { id: prev.shares.length + 1, ...newShare }],
    }));

    setNewShare({ name: '', status: '', key: '' });
  };

  return (
    <div className="p-12 bg-white rounded-lg shadow-2xl border-4 border-gray-300 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center">Dashboard</h2>

      {/* Guardian Details */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold">Welcome, {guardianDetails.name}!</h3>
      </div>

      {/* Shares Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Your Shares</h3>
        {guardianDetails.shares.length > 0 ? (
          <div className="space-y-4">
            {guardianDetails.shares.map((share) => (
              <div
                key={share.id}
                className="p-4 border border-gray-400 rounded-md bg-gray-50 flex justify-between"
              >
                <div>
                  <p className="font-bold">Name: {share.name}</p>
                  <p>Status: {share.status}</p>
                  <p>Key: {share.key}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No shares available.</p>
        )}
      </div>

      {/* Add Share Form */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Add Share</h3>
        <form onSubmit={handleAddShare} className="space-y-4">
          <div>
            <label className="block text-gray-700">Share Name</label>
            <input
              type="text"
              name="name"
              value={newShare.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={newShare.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Key</label>
            <input
              type="text"
              name="key"
              value={newShare.key}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            Add Share
          </button>
        </form>
      </div>

      {/* Logout Button */}
      <div className="text-center">
        <button
          onClick={onLogout}
          className="bg-red-500 text-white py-4 px-12 rounded-md text-2xl uppercase hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
