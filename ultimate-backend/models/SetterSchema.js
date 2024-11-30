import mongoose from "mongoose";

const setterSchema = new mongoose.Schema({
    setterId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    instituteId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
       
    },
    phone: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    settedQId: {
        type: String,
        default: null
    }
})

modules.export=mongoose.model("Setter",setterSchema)