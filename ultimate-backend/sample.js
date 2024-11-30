
import { encryptData,decryptData } from "../utils/encrypt"
import crypto from 'crypto'
 const addQuestions=(data)=>{
  try{
    const key = crypto.randomBytes(32); 
    const {QuestionId,setterId,examId,question,options,marks,correctOption}=data
    const {iv,encryptedQuestion}=encryptData(data.question,key);
    

  }catch(error){

  }
}
const info = {
  QuestionId: 'Q001',
  setterId: 'S001',
  examId: 'E001',
  question: 'What is the capital of Japan?',
  content: 'Select the correct answer from the options below.',
  options: ['Tokyo', 'Seoul', 'Beijing', 'Bangkok'],
  marks: 5
};

addQuestions(info);