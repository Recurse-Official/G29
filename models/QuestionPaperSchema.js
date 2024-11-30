import mongoose from "mongoose";


const QuestionPaperSchema = new mongoose.Schema({
    QuestionId: {
        type: String,
        required: true
    },
    setterId: {
        type: String,
        required: true
    },
    examId: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
        default:1
    },
    correctOption:{
        type:String,
        required:true
    }

});

const QuestionPaper = mongoose.model('QuestionPaper', QuestionPaperSchema);

export default QuestionPaper;