import { addItemToQueue, fetchQueueData,getQuestionsService } from '../services/publicService.js';
import express from 'express'

export const submitItem = async (req, res) => {
  const { publicKey, enrollmentId, questionId, chosenOption, signature, isverified } = req.body;
  const newItem = { publicKey, enrollmentId, questionId, chosenOption, signature, isverified };

  try {
    await addItemToQueue(newItem);
    res.status(200).json({ message: 'Item added to the queue' });
  } catch (error) {
    console.error('Error adding item to queue:', error);
    res.status(500).json({ error: 'Failed to add item to queue' });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await fetchQueueData();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching queue data:', error.message);
    res.status(500).json({ error: 'Failed to fetch queue data' });
  }
};

export const getQuestions=async(req,res)=>{
    try{
        console.log("code reached here")
        const questions = await getQuestionsService();
        console.log(questions)
        res.status(200).json(questions)
    }catch(error){
        console.error('Error Question data',error.message)
        res.status(500).json({message:"error occured in backend"})
    }
}