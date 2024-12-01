import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        guardianId: '',
        name: '',
        fatherName: '',
        age: '',
        instituteId: '',
        email: '',
        phone: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/guardians/register', formData);
            setMessage(response.data.message);
            setFormData({
                guardianId: '',
                name: '',
                fatherName: '',
                age: '',
                instituteId: '',
                email: '',
                phone: '',
                password: ''
            });
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Guardian Registration</h2>
            {message && <p className="text-red-500 text-center mb-4">{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="guardianId" placeholder="Guardian ID" value={formData.guardianId} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded" required />
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded" required />
                <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded" required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded" required />
                <input type="text" name="instituteId" placeholder="Institute ID" value={formData.instituteId} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded" required />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 mb-6 border border-gray-300 rounded" required />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;