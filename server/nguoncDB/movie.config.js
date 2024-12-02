import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.MOVIE_API_BASE_URL;
console.log("MOVIE_API_BASE_URL:", process.env.MOVIE_API_BASE_URL);
const getUrl = (endpoint, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return `${baseUrl}${endpoint}?${queryString}`;
};
console.log(getUrl("/films/search", { keyword: "Regeneration" }));

export default { getUrl };
