import express from "express";
import {
  getNewestMovies,
  getTVMovies,
  getMovies,
  getMovieDetails,
  getMoviesByGenre,
  getMoviesByYear,
  getMoviesByCountry,
  searchMovies,
} from "../Controllers/MovieController.js";

const router = express.Router();

// *********** PUBLIC ROUTES *********** //
router.get("/newest", getNewestMovies); // Get newest movies
router.get("/search", searchMovies); // Search movies
router.get("/tv-series", getTVMovies); // Get TV movies
router.get("/movies", getMovies); // Get all movies
router.get("/:slug", getMovieDetails); // Get movie details
router.get("/genres/:slug", getMoviesByGenre); // Get movies by genre
router.get("/year/:year", getMoviesByYear); // Get movies by year
router.get("/country/:slug", getMoviesByCountry); // Get movies by country

export default router;