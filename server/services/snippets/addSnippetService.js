// Importing data models
import Snippet from "../../models/snippetModel.js";

// Importing cusotm middlewares
import { errorHandler } from "../../middlewares/errorHandler.js";

// Creating and exporting the service for handling Adding new Snippets
export const addSnippetService = async (snipName, snipLang, snipCode, snipDesc, userId) => {
    // Validate the incoming data of snippet
    if(!snipName || !snipLang || !snipCode || !snipDesc){
        throw errorHandler(
            400, 
            "All fields are required.", 
            "Provide all values before submitting."
        );
    }

    // Create a new snippet from received data
    const newSnipp = new Snippet({
        userId: userId,
        name: snipName,
        language: snipLang,
        code: snipCode,
        description: snipDesc
    });

    // Store the created Snippet to database
    await newSnipp.save();

    // Send the success response having created snippet and a message
    return { message: "Snippet added successfully !", newSnippet: newSnipp };
};