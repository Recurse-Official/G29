import redisClient from '../config/redisClient.js';
import { promisify } from 'util';
import QuestionPaper from '../models/QuestionPaperSchema.js';

const rpushAsync = promisify(redisClient.rpush).bind(redisClient);
const lrangeAsync = promisify(redisClient.lrange).bind(redisClient);

export const addItemToQueue = async (newItem) => {
  try {
    await rpushAsync('queue', JSON.stringify(newItem));
  } catch (err) {
    throw new Error(`Error adding item to queue: ${err.message}`);
  }
};

export const fetchQueueData = async () => {
  try {
    const queueData = await lrangeAsync('queue', 0, -1);
    return queueData.map((item) => JSON.parse(item));
  } catch (err) {
    console.log("there is an error in this code-fetchDataservice");
  }
};

export const getQuestionsService=async()=>{
    try{
        const questions = await QuestionPaper.find();
        if(questions){
            return question;
        }
    }catch(error){
        console.log("there is an error in this code -fetch all the questions");
    }
}