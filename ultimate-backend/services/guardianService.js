import mongoose from "mongoose";
import Guardian from "../models/GuardianSchema.js";

export const loginService = async (data) => {
    const { phone, password } = data; // Destructure phone and password from data

    try {
        const guardian = await Guardian.findOne({ phone });

        if (!guardian) {
            return { success: false, message: 'Guardian not found' };
        }

        

        if (password!==guardian.password) {
            return { success: false, message: 'Invalid password' };
        }

        return {
            success: true,
            message: 'Login successful',
            guardianId: guardian.guardianId,
            name: guardian.name,
            type: guardian.type,
            email: guardian.email,
            phone: guardian.phone,
            keyPair: guardian.keyPair 
        };
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Internal server error' };
    }
};


export const registrationService = async (data) => {
    const { guardianId, name, fatherName, age, instituteId, email, phone, password } = data;

    try {
        const existingGuardian = await Guardian.findOne({ phone });
        if (existingGuardian) {
            return { success: false, message: 'Phone number already registered' };
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        
        const newGuardian = new Guardian({
            guardianId,
            name,
            fatherName,
            age,
            instituteId,
            email,
            phone,
            password,
            keyPair: [] 
        });

        await newGuardian.save();

        return {
            success: true,
            message: 'Registration successful',
            guardianId: newGuardian.guardianId,
            name: newGuardian.name,
            type: newGuardian.type,
            email: newGuardian.email,
            phone: newGuardian.phone
        };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: 'Internal server error' };
    }
};



export const submitKeyShareService = async (setId, keyShare) => {
    try {
    
        if (!setId || !keyShare) {
            throw new Error('setId and keyShare are required');
        }

        
        const keyShareEntry = {
            setId,
            keyShare,
            timestamp: new Date().toISOString()
        };

        
        const queueName = `keyShareQueue:${setId}`;

        const queueLength = await redisClient.llen(queueName);

        if (queueLength === 0) {
            console.log(`Queue ${queueName} does not exist or is empty.`);
            
        } else {
            console.log(`Queue ${queueName} exists with ${queueLength} entries.`);
        }

        
        await redisClient.rPush(queueName, JSON.stringify(keyShareEntry));

       
        const currentQueue = await redisClient.lRange(queueName, 0, -1);
        console.log(`Current Key Share Queue (${queueName}):`, currentQueue);

        return {
            success: true,
            message: 'Key share submitted successfully',
            data: keyShareEntry 
        };
    } catch (error) {
        console.error('Error submitting key share:', error);
        return {
            success: false,
            message: error.message || 'Internal server error'
        };
    }
};
