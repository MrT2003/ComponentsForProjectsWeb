import movieApi from "../nguoncDB/movie.api.js"; 
import movieConfig from "../nguoncDB/movie.config.js";
import asyncHandler from 'express-async-handler';


// @desc Get newest movies
// @route GET /api/movies/newest
// @access Public
const getNewestMovies = asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    try {
      const response = await movieApi.getNewestMovies(page);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
// @desc Get TV movies
// @route GET /api/movies/tv
// @access Public
const getTVMovies = asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    try {
      const response = await movieApi.getTVMovies(page);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// @desc Get regular movies
// @route GET /api/movies
// @access Public
const getMovies = asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    try {
      const response = await movieApi.getMovies(page);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// @desc Get movie details and episodes
// @route GET /api/movies/:slug
// @access Public
const getMovieDetails = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    try {
      const response = await movieApi.getFilmDetail(slug);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// @desc Get movies by genre
// @route GET /api/movies/genres/:slug
// @access Public
const getMoviesByGenre = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const { page = 1 } = req.query;
    try {
      const response = await movieApi.getFilmsByGenre(slug, page);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  // @desc Get movies by year
// @route GET /api/movies/year/:year
// @access Public
const getMoviesByYear = asyncHandler(async (req, res) => {
    const { year } = req.params;
    const { page = 1 } = req.query;
    try {
      const response = await movieApi.getFilmsByYear(year, page);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// @desc Get movies by country
// @route GET /api/movies/country/:slug
// @access Public
const getMoviesByCountry = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const { page = 1 } = req.query;
    try {
      const response = await movieApi.getFilmsByCountry(slug, page);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// @desc Search movies
// @route GET /api/movies/search
// @access Public
const searchMovies = asyncHandler(async (req, res) => {
    const { keyword } = req.query;
    console.log("Calling searchMovies with keyword:", keyword); // Debug log
    if (!keyword) {
      return res.status(400).json({ message: "Search keyword is required" });
    }
    try {
      const response = await movieApi.searchMovies(keyword);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: error.message });
  }
});

  export {
    getNewestMovies,
    getTVMovies,
    getMovies,
    getMovieDetails,
    getMoviesByGenre,
    getMoviesByYear,
    getMoviesByCountry,
    searchMovies,
  };