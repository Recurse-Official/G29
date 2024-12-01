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
       
        if (!question || !options || !correctOption || !examId || !guardianIds) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const questionId = new mongoose.Types.ObjectId().toString();
        const key = generateRandomKey();

        const encryptedQuestion = encrypt(question, key);
        const encryptedOptions = options.map(option => encrypt(option, key));

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

export const getQuestion = async (req, res) => {
    const { questionId } = req.params;

    try {
        const questionPaper = await QuestionPaper.findOne({ QuestionId: questionId });

        if (!questionPaper) {
            return res.status(404).json({ message: 'Question paper not found' });
        }

        if (!req.guardianShares || req.guardianShares.length < 2) {
            return res.status(400).json({ message: 'Not enough shares to reconstruct key' });
        }

        const key = reconstructShamirKey(req.guardianShares); 

        const decryptedQuestion = decrypt(questionPaper.question, key, questionPaper.iv);
        const decryptedOptions = questionPaper.options.map(option => decrypt(option, key, questionPaper.iv));

        res.status(200).json({
            question: decryptedQuestion,
            options: decryptedOptions,
        });
    } catch (error) {
        console.error('Error retrieving question:', error); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
};