import mongoose  from "mongoose";


const KeyPairSchema = new mongoose.Schema({
    setId: {
        type: String,
        required: true,
    },
    share: {
        type: String, 
        required: true,
    },
});
const GuardianSchema=new mongoose.Schema({
    guardianId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    keyPair:{
       type:[KeyPairSchema],
       required: true,
    }

})
export default mongoose.model('Guardian',GuardianSchema);
