// Importing data models
import Snippet from "../../models/snippetModel.js";
import Favourite from "../../models/favouriteModel.js";

// Importing custom middlewares
import { errorHandler } from "../../middlewares/errorHandler.js";

// Creating and exporting the service for handling Adding favourite snippets
export const addToFavouriteService = async (snippetId, userId) => {
    // check if the snippet to be added as Favourite exists or not
    const targetSnippet = await Snippet.findById(snippetId);
    if (!targetSnippet) {
        throw errorHandler(
            404, 
            "Desired snippet not found", 
            "Make sure the snippet exist to mark as favourite");
    }

    // Search for the user in favourites & create a new user if not exists
    let favouriteData = await Favourite.findOne({ userId });
    if (!favouriteData) {
        favouriteData = new Favourite({ userId, snippetIds: [] });
    }

    // Check if the snippet is already in favourites
    if (favouriteData.snippetIds.includes(snippetId)) {
        throw errorHandler(
            302, 
            "Snippet already in favourites.", 
            "Try adding another snippet."
        );
    }

    // Store the snippet to favourites collection
    favouriteData.snippetIds.push(snippetId);
    await favouriteData.save();

    // Send a success response message
    return { message: "Snippet marked as Favourite !!" };
};