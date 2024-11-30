import crypto from 'crypto';

export const generateRandomKey = () => {
  return crypto.randomBytes(16).toString('hex'); 
};