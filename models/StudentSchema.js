import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    enrollmentId: {
        type: String,
        required: true,
        unique: true
    },
    publicKey: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true,
        min: 0,
        max: 10 
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/ 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        default: ""
    }
})