// Importing data models
import Favourite from "../../models/favouriteModel.js";

// Importing custom middlewares
import { errorHandler } from "../../middlewares/errorHandler.js";

// Creating and exporting the service for handling Fetching favourite snippets
export const getFromFavouriteService = async (query, userId) => {
    // Parameters or filters to fetch the snippets 
    const startIndex = parseInt(query.startIndex) || 0;
    const limit = parseInt(query.limit) || 9;
    const sortDirection = query.order === "asc" ? 1 : -1;

    // Find the user specific favourite snippet from collection
    const favouriteData = await Favourite.findOne({ userId }).populate({
        path: 'snippetIds',     // path where the snippet is stored under favourite collection
        options: {
            sort: { createdAt: sortDirection },
            skip: startIndex,
            limit: limit,
        }
    });

    // Check if nothing is there to show in response
    if (!favouriteData || favouriteData.snippetIds.length === 0) {
        return { message: "Nothing to fetch from Favourite Snippets !!" };
    }

    // Calculate the total favourite snippets
    const totalFavouriteSnippets = favouriteData.snippetIds.length;

    // Send the success response having fetched Fav Snippets and total count
    return { 
        favouriteSnippets: favouriteData,
        totalFavouriteSnippets
    };
};
