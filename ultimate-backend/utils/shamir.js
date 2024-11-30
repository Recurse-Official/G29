// utils/shamir.js
import { randomBytes } from 'crypto';
import Shamir from 'shamirs-secret-sharing';
// Function to generate a random key for AES-256
export const generateRandomKey = () => {
    return randomBytes(32); // 32 bytes for AES-256
};

// Function to generate Shamir shares
export const generateShamirShares = (secret, totalShares, threshold) => {
   
    const shares = Shamir.split(secret, { shares: totalShares, threshold });
    return shares;
};

// Function to reconstruct Shamir key
export const reconstructShamirKey = (shares) => {
  
    const recoveredSecret = Shamir.combine(shares);
    return recoveredSecret;
};