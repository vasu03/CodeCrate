// Importing data models
import Snippet from "../../models/snippetModel.js";

// Importing cusotm middlewares
import { errorHandler } from "../../middlewares/errorHandler.js";

// Creating and exporting the service for handling Fetching of Snippets
export const getSnippetService = async (query, userId) => {
    // Parameters or filters to fetch the snippets 
    const startIndex = parseInt(query.startIndex) || 0;
    const limit = parseInt(query.limit) || 9;
    const sortDirection = query.order === "asc" ? 1 : -1;

    // Search all the snippets for requested user with filters 
    const snippets = await Snippet.find({
        userId,
    }).sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

    // Calculate the total no. of Snippets
    const totalSnippets = await Snippet.countDocuments();

    // Send the success response having fetched Snippets and total count
    return { fetchedSnippets: snippets, totalSnippets };
};
