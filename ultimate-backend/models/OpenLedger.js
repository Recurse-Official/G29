import mongoose from 'mongoose';

const OpenLedgerSchema = new mongoose.Schema({
    enrollmentId: {
        type: String,
        required: true,
        unique: true 
    },
    publicKey: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    selectedOption: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false 
    }
}, { 
    timestamps: true 
});

const OpenLedger = mongoose.model('OpenLedger', OpenLedgerSchema);

export default OpenLedger;