// Importing data models
import Snippet from "../../models/snippetModel.js";

// Importing cusotm middlewares
import { errorHandler } from "../../middlewares/errorHandler.js";

// Creating and exporting the service for handling Updating a Snippet
export const updateSnippetService = async (newName, newLang, newCode, newDesc, snippetId) => {
    // Check if nothing new is there to update
    const targetSnippet = await Snippet.findById(snippetId);

    if (
        newName === targetSnippet.name &&
        newLang === targetSnippet.language &&
        newCode === targetSnippet.code &&
        newDesc === targetSnippet.description
    ) {
        throw errorHandler(
            304,
            "Nothing new to update",
            "Make some changes for updating"
        );
    }

    // search the specific post and update the it with obtained data
    const updatedSnippet = await Snippet.findByIdAndUpdate(
        snippetId,
        {
          $set: {
            name: newName,
            language: newLang,
            code: newCode,
            description: newDesc
          } 
        }, { new: true }
    );

    // Send the success response having updated snippet and a message
    return { message: "Snippet updated successfully", updatedSnippet };
};