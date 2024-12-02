import axios from "axios";
import movieEndpoints from "./movie.endpoints.js";

const movieApi = {
  getNewestMovies: async (page = 1) => {
    const url = movieEndpoints.getNewestMovies(page);
    console.log("Fetching URL:", url); // Debug log
    return await axios.get(url);
  },
  getTVMovies: async (page = 1) =>
    await axios.get(movieEndpoints.getTVMovies(page)),
  
  getMovies: async (page = 1) =>
    await axios.get(movieEndpoints.getMovies(page)),
  
  getFilmDetail: async (slug) =>
    await axios.get(movieEndpoints.getFilmDetail(slug)),
  
  getFilmsByGenre: async (slug, page = 1) =>
    await axios.get(movieEndpoints.getFilmsByGenre(slug, page)),
  
  getFilmsByYear: async (year, page = 1) =>
    await axios.get(movieEndpoints.getFilmsByYear(year, page)),
  
  getFilmsByCountry: async (slug, page = 1) =>
    await axios.get(movieEndpoints.getFilmsByCountry(slug, page)),

  searchMovies: async (slug) =>
    await axios.get(movieEndpoints.searchMovies(slug)),
};

export default movieApi;
