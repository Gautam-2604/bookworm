import mongoose, { Schema } from "mongoose";


const bookSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    ownerId:{
        type: String
    }
    
})

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;