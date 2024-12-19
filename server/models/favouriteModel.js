// Importing required modules
import mongoose from 'mongoose';

// Creating the favourites Schema
const favouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    snippetIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snippet",
    }]
}, { timestamps: true });

// Exporting our model
const favourite = mongoose.model('favourite', favouriteSchema);
export default favourite;