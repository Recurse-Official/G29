import mongoose from 'mongoose';
import Guardian from '../models/GuardianSchema.js';
import QuestionPaper from '../models/QuestionPaperSchema.js';
import { generateShamirShares, reconstructShamirKey } from '../utils/shamir.js'; 
import { generateRandomKey } from '../services/keyService.js'; 
import { encrypt, decrypt } from '../utils/encryptdecrypt.js';

// Fetch all guardians
export const getGuardians = async (req, res) => {
    try {
        const guardians = await Guardian.find();
        res.status(200).json(guardians);
    } catch (error) {
        console.error('Error fetching guardians:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const setQuestion = async (req, res) => {
    const { question, setterId,options, correctOption, examId, guardianIds } = req.body;

    try {
        // Validate input data
        if (!question || !options || !correctOption || !examId || !guardianIds) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const questionId = new mongoose.Types.ObjectId().toString();
        const key = generateRandomKey();

        // Encrypt question and options
        const encryptedQuestion = encrypt(question, key);
        const encryptedOptions = options.map(option => encrypt(option, key));

        // Create new question paper
        const questionPaper = new QuestionPaper({
            QuestionId: questionId,
            setterId: setterId,
            examId,
            question: encryptedQuestion.encryptedData,
            correctOption:correctOption,
            options: encryptedOptions.map(option => option.encryptedData),
            iv: encryptedQuestion.iv,
            marks: 1,
        });

        await questionPaper.save();

        // Generate Shamir shares
        const shares = generateShamirShares(key, guardianIds.length, 2);

        // Distribute shares to guardians
        for (let i = 0; i < guardianIds.length; i++) {
            const guardian = await Guardian.findById(guardianIds[i]);
            if (guardian) {
                guardian.keyPair.push({
                    setId: questionId,
                    share: shares[i],
                });
                await guardian.save();
            } else {
                console.warn(`Guardian with ID ${guardianIds[i]} not found.`);
            }
        }

        res.status(200).json({ message: 'Question set and key shares distributed' });
    } catch (error) {
        console.error('Error setting question:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get question for the guardians (decrypt it once all guardians have come together)
export const getQuestion = async (req, res) => {
    const { questionId } = req.params;

    try {
        // Retrieve the question paper based on the questionId
        const questionPaper = await QuestionPaper.findOne({ QuestionId: questionId });

        if (!questionPaper) {
            return res.status(404).json({ message: 'Question paper not found' });
        }

        // Ensure guardianShares are available in request
        if (!req.guardianShares || req.guardianShares.length < 2) {
            return res.status(400).json({ message: 'Not enough shares to reconstruct key' });
        }

        // Reconstruct the encryption key using Shamir's secret shares
        const key = reconstructShamirKey(req.guardianShares); 

        // Decrypt the question and options
        const decryptedQuestion = decrypt(questionPaper.question, key, questionPaper.iv);
        const decryptedOptions = questionPaper.options.map(option => decrypt(option, key, questionPaper.iv));

        // Send the decrypted question and options
        res.status(200).json({
            question: decryptedQuestion,
            options: decryptedOptions,
        });
    } catch (error) {
        console.error('Error retrieving question:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};