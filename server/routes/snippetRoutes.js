// Importing required modules
import express from 'express';
import { addFavouriteSnippet, deleteFavouriteSnippet, getFavouriteSnippets } from '../controllers/snippetController.js';
import { createSnippets, deleteSnippets, getSnippets, updateSnippets } from '../controllers/snippetController.js';

// Importing custom middlewares
import { verifyUser } from "../middlewares/verifyUser.js";

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/fetch", verifyUser, getSnippets);
router.post("/add", verifyUser, createSnippets);
router.put("/update/:snippetId", verifyUser, updateSnippets);
router.delete("/delete/:snippetId", verifyUser, deleteSnippets);

router.get("/favourites/fetch", verifyUser, getFavouriteSnippets);
router.post("/favourites/add/:snippetId", verifyUser, addFavouriteSnippet);
router.delete("/favourites/delete/:snippetId", verifyUser, deleteFavouriteSnippet);


// Exporting the router
export default router;