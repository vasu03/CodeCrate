// Importing custom Snippet services
import { getSnippetService } from "../services/snippets/getSnippetService.js";
import { addSnippetService } from "../services/snippets/addSnippetService.js";
import { updateSnippetService } from "../services/snippets/updateSnippetService.js";
import { deleteSnippetService } from "../services/snippets/deleteSnippetService.js";

// Importing custom Favourite Snippet services
import { getFromFavouriteService } from "../services/favouriteSnippets/getFromFavouriteService.js";
import { addToFavouriteService } from "../services/favouriteSnippets/addToFavouriteService.js";
import { deleteFromFavouriteService } from "../services/favouriteSnippets/deleteFromFavouriteService.js";


// Creating a Get Snippets Controller Function
export const getSnippets = async (req, res, next) => {
    try {
        // get the userID from the request
        const userId = req.user.userId;

        // Get the response from the Get Snippet service
		const serviceResponse = await getSnippetService(req.query, userId);
		
        // send the fetched snippets as response
		res.status(200).json(serviceResponse);
	} catch (error) {
        next(error);
    }
};


// Creating a Create Snippets Controller Function
export const createSnippets = async (req, res, next) => {
    try {
        // destructuring the incoming data
        const { snipName, snipLang, snipCode, snipDesc } = req.body

        // get the userID from the request
        const userId = req.user.userId;

        // Get the response from the Add Snippet service
        const serviceResponse = await addSnippetService(snipName, snipLang, snipCode, snipDesc, userId);

        // return the created snippet as response
        res.status(201).json(serviceResponse);
    } catch (error) {
        next(error);
    }
};


// Creating a Update Snippets Controller Function
export const updateSnippets = async (req, res, next) => {
    try {
        // Grab the snippet Id from the request 
        const snippetId = req.params.snippetId;

        // Destructuring the incoming data with aliases
        const {
            snipName: newName, 
            snipLang: newLang, 
            snipCode: newCode, 
            snipDesc: newDesc
        } = req.body;

        // Get the response from the Update Snippet service
        const serviceResponse = await updateSnippetService(newName, newLang, newCode, newDesc, snippetId);
        
        // send the updated snippet as response
        res.status(200).json(serviceResponse);
    } catch (error) {
        next(error);
    }
};


// Creating a Delete Snippets Controller Function
export const deleteSnippets = async (req, res, next) => {
    try {
        // Grab the snippet Id from the request
		const snippetId = req.params.snippetId;
        
        // Get the response from the Delete Snippet service
        const serviceResponse = await deleteSnippetService(snippetId);
        
        // send the fetched message as response
		res.status(200).json(serviceResponse);
	} catch (error) {
        next(error);
    }
};


// Creating a Fetch Snippets from Favourites Controller Function
export const getFavouriteSnippets = async (req, res, next) => {
    try {
        // get the userID from the request
        const userId = req.user.userId;

        // Get the response from the Get Favourite Snippet service
		const serviceResponse = await getFromFavouriteService(req.query, userId);

        // Send the fetched favourite snippets as repsonse
        res.status(200).json(serviceResponse);
    } catch (error) {
        next(error);
    }
};



// Creating a Add Snippets to Favourites Controller Function
export const addFavouriteSnippet = async (req, res, next) => {
    try {
        // grab the parameters from request to insert a new record to favourites
        const snippetId = req.params.snippetId;
        const userId = req.user.userId;

        // Get the response from the Add Favourite Snippet service
		const serviceResponse = await addToFavouriteService(snippetId, userId);

        // send a successfull response
        res.status(201).json(serviceResponse);
    } catch (error) {
        next(error);
    }
};



// Creating a Add Snippets to Favourites Controller Function
export const deleteFavouriteSnippet = async (req, res, next) => {
    try {
		// grab the parameters from request to insert a new record to favourites
        const snippetId = req.params.snippetId;
        const userId = req.user.userId;

        // Get the response from the Delete Favourite Snippet service
        const serviceResponse = await deleteFromFavouriteService(snippetId, userId);

        // search the specific post and delete it
		res.status(200).json({ message: "Deleted successfully." });
	} catch (error) {
        next(error);
    }
};