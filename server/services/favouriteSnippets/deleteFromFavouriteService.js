// Importing data models
import Favourite from "../../models/favouriteModel.js";

// Creating and exporting the service for handling deleting a favourite snippet
export const deleteFromFavouriteService = async (snippetId, userId) => {
    // Find the Favourite document for the user and update the snippetIds array
    const result = await Favourite.findOneAndUpdate(
        { userId }, // Find by userId
        { $pull: { snippetIds: snippetId } }, // Remove snippetId from snippetIds array
        { new: true } // Return the updated document
    );

    // Check if the document exists and was updated
    if (!result) {
        throw new Error("User not found or snippet not in favourites.");
    }

    // Send a success response message
    return { message: "Snippet deleted from favourites successfully." };
};
