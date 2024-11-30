import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const encryptData = (data, key) => {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16); 

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    
    const dataString = JSON.stringify(data);
    
    let encrypted = cipher.update(dataString, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
};

const decryptData = (encryptedData, key, iv) => {
    const algorithm = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
};

const data = {
    QuestionId: 'Q001',
    setterId: 'S001',
    examId: 'E001',
    question: 'What is the capital of Japan?',
    content: 'Select the correct answer from the options below.',
    options: ['Tokyo', 'Seoul', 'Beijing', 'Bangkok'],
    marks: 5
};

const key = crypto.randomBytes(32); 
const { iv, encryptedData } = encryptData(data, key);
console.log('Encrypted Data:', { iv, encryptedData });

const decryptedData = decryptData(encryptedData, key, iv);
console.log('Decrypted Data:', decryptedData);