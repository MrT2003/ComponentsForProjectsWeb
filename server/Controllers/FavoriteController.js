import asyncHandler from 'express-async-handler';
import List from "../Models/FavoriteModel.js";

//@desc Get all liked movies
//@router GET /api/users/favorites

const getList = asyncHandler(async (req, res) => {
    const { listType } = req.params;
    // Validate list type
    if (!["favoriteList", "watchList", "continueList"].includes(listType)) {
      return res.status(400).json({ message: "Invalid list type" });
    }
  
    try {
      // Use req.user._id from the protect middleware
      const items = await List.find({ userId: req.user._id, listType: listType });
      if (!items.length) {
        return res.status(404).json({ message: `${listType} is empty` });
      }
  
      res.status(200).json(items);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
//@desc Add movie to favorite list
//@router POST /api/users/favorites
//@access Private

const addToList = asyncHandler(async (req, res) => {
  const { movieId, name, poster, slug, currentEpisode, quality, language, year, listType } = req.body;

  if (!["favoriteList", "watchList", "continueList"].includes(listType)) {
      return res.status(400).json({ message: "Invalid list type" });
  }

  const userId = req.user._id; // Get userId from the authenticated user

  try {
      const existingItem = await List.findOne({ userId, movieId, listType });
      if (existingItem) {
          return res.status(400).json({ message: "Movie already exists in the list" });
      }

      const newItem = await List.create({
          userId, // Automatically associate the item with the authenticated user
          movieId,
          name,
          poster,
          slug,
          currentEpisode,
          quality,
          language,
          year,
          listType,
      });

      res.status(201).json(newItem);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});


const updateContinueList = asyncHandler(async (req, res) => {
  const { movieId, clickedEpisode } = req.body;

  const userId = req.user._id; // Get userId from the authenticated user

  try {
      const existingItem = await List.findOne({ userId, movieId, listType: "continueList" });
      if (!existingItem) {
          return res.status(404).json({ message: "Movie not found in the continue list" });
      }

      existingItem.clickedEpisode = clickedEpisode;
      await existingItem.save();

      res.status(200).json(existingItem);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

//@desc delete movie from favorite list
//@router DELETE /api/users/favorites
//@access Private
const deleteItem = asyncHandler(async (req, res) => {
    const { listType, id: movieId } = req.params;
  
    // Validate list type
    if (!["favoriteList", "watchList", "continueList"].includes(listType)) {
      return res.status(400).json({ message: "Invalid list type" });
    }
  
    try {
      // Find and delete the item in the specified list
      const item = await List.findOneAndDelete({
        userId: req.user._id, // Ensures the action is scoped to the logged-in user
        movieId,
        listType: listType,
      });
  
      if (!item) {
        return res.status(404).json({ message: "Item not found in the specified list" });
      }
  
      res.status(200).json({ message: "Item successfully removed", item });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

export { addToList, getList, deleteItem, updateContinueList };