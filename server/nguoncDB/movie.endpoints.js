import movieConfig from "./movie.config.js";

const movieEndpoints = {
  getNewestMovies: (page) => movieConfig.getUrl("/films/phim-moi-cap-nhat", { page }),
  getTVMovies: (page) => movieConfig.getUrl("/films/danh-sach/phim-bo", { page }),
  getMovies: (page) => movieConfig.getUrl("/films/danh-sach/phim-le", { page }),
  getFilmDetail: (slug) => movieConfig.getUrl(`/film/${slug}`),
  getFilmsByGenre: (slug, page) => movieConfig.getUrl(`/films/the-loai/${slug}`, { page }),
  getFilmsByYear: (year, page) => movieConfig.getUrl(`/films/nam-phat-hanh/${year}`, { page }),
  getFilmsByCountry: (slug, page) => movieConfig.getUrl(`/films/quoc-gia/${slug}`, { page }),
  searchMovies: (slug) =>movieConfig.getUrl("/films/search", { keyword: slug }),
};

export default movieEndpoints;
