// seed.js
import mongoose from 'mongoose';
import connectDB from './config/db.js';// Adjust the path as necessary
import Setter from './models/SetterSchema.js'

const seedData = async () => {
    await connectDB(); // Connect to the database

    // Sample data based on your Setter schema
    const setters = [
        {
            setterId: 'setter001',
            name: 'Alice Johnson',
            fatherName: 'Robert Johnson',
            age: 30,
            instituteId: 'institute001',
            email: 'alice.johnson@example.com',
            phone: '123-456-7890',
            password: 'securepassword1', // In production, hash this password
            settedQId: null,
        },
        {
            setterId: 'setter002',
            name: 'Bob Smith',
            fatherName: 'Michael Smith',
            age: 25,
            instituteId: 'institute002',
            email: 'bob.smith@example.com',
            phone: '098-765-4321',
            password: 'securepassword2', // In production, hash this password
            settedQId: null,
        },
        {
            setterId: 'setter003',
            name: 'Charlie Brown',
            fatherName: 'Charlie Brown Sr.',
            age: 28,
            instituteId: 'institute003',
            email: 'charlie.brown@example.com',
            phone: '555-555-5555',
            password: 'securepassword3', // In production, hash this password
            settedQId: null,
        },
    ];

    try {
        // Save all setters to the database
        await Setter.insertMany(setters);
        console.log('Sample data saved successfully');
    } catch (error) {
        console.error('Error saving sample data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
};

// Run the seed function
seedData();

