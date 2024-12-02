import express from "express";
import { protect } from "../middlewares/Auth.js";
import { addToList, getList, deleteItem, updateContinueList } from "../Controllers/FavoriteController.js";

const router = express.Router();

// *********** FAVORITES ROUTES *********** //

// Add movie to favorite list
router.post("/", protect, addToList);

// Get all favorite movies for a user
router.get("/:listType", protect, getList);

// Delete a favorite movie by ID
router.delete("/:listType/:id", protect, deleteItem);

// Update continue list
router.put("/:listType", protect, updateContinueList);
export default router;
