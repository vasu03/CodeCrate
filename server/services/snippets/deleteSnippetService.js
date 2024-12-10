// Importing data models
import Snippet from "../../models/snippetModel.js";

// Importing cusotm middlewares
import { errorHandler } from "../../middlewares/errorHandler.js";

// Creating and exporting the service for handling Fetching of Snippets
export const deleteSnippetService = async (snippetId) => {
    // Search the specific post and delete it
    await Snippet.findByIdAndDelete(snippetId);

    return { message: "Snippet deleted successfully" };
};