// Importing required modules
import mongoose from "mongoose";

// Creating the snippets Schema
const snippetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Exporting our model
const snippet = mongoose.model("Snippet", snippetSchema);
export default snippet;
