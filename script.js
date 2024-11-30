import connectDB from './config/db.js';
import QuestionPaper from './models/QuestionPaperSchema.js';

async function insertSampleData() {
    try {
        await connectDB();

        const sampleQuestions = [
            {
                QuestionId: 'Q001',
                setterId: 'S001',
                examId: 'E001',
                question: 'What is the capital of Japan?',
                content: 'Select the correct answer from the options below.',
                options: ['Tokyo', 'Seoul', 'Beijing', 'Bangkok'],
                marks: 5
            },
            {
                QuestionId: 'Q002',
                setterId: 'S002',
                examId: 'E002',
                question: 'Which planet is known as the Red Planet?',
                content: 'Choose the correct option.',
                options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
                marks: 3
            },
            {
                QuestionId: 'Q003',
                setterId: 'S001',
                examId: 'E003',
                question: 'What is the largest mammal in the world?',
                content: 'Select one option.',
                options: ['Elephant', 'Blue Whale', 'Giraffe', 'Great White Shark'],
                marks: 4
            },
            {
                QuestionId: 'Q004',
                setterId: 'S003',
                examId: 'E001',
                question: 'What is the chemical symbol for water?',
                content: 'Choose the correct answer.',
                options: ['H2O', 'O2', 'CO2', 'NaCl'],
                marks: 2
            },
            {
                QuestionId: 'Q005',
                setterId: 'S002',
                examId: 'E002',
                question: "Who wrote \"Romeo and Juliet\"?",
                content: "Select the correct author.",
                options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
                marks: 3
            }
        ];

        await QuestionPaper.insertMany(sampleQuestions);
        
        console.log("Sample data inserted successfully");
    } catch (error) {
        console.error("Error inserting sample data:", error);
    }
}

insertSampleData();