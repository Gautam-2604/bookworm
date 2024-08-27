import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    bookUpload:{
        type:[String]
    },
    bookRequest:{
        type:[String]
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;