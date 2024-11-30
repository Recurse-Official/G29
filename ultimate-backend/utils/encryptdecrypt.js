import crypto from 'crypto';

export const encrypt = (data, key) => {
    if (key.length !== 32) {
        throw new Error('Invalid key length; must be 32 bytes for AES-256');
    }

    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    return {
        iv: iv.toString('hex'), // Return IV for decryption
        encryptedData: encryptedData,
    };
};

export const decrypt = (encryptedData, key, ivHex) => {
    if (key.length !== 32) {
        throw new Error('Invalid key length; must be 32 bytes for AES-256');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    return decryptedData;
};