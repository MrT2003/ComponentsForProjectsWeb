export interface ContinueList {
  _id: string;
  userId: string;
  movieId: string;
  name: string;
  poster: string;
  slug: string;
  currentEpisode: string;
  quality: string;
  language: string;
  year: string;
  listType: string;
  totalUploadEpisodes: number;
  clickedEpisode: number;
  process: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export class PostContinueMovie {
  _id: string;
  userId: string;
  movieId: string;
  name: string;
  poster: string;
  slug: string;
  currentEpisode: string;
  quality: string;
  language: string;
  year: string;
  listType: string;
  totalUploadEpisodes: number;
  clickedEpisode: number;
  process: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  constructor() {
    this._id = "";
    this.userId = "";
    this.movieId = "";
    this.name = "";
    this.poster = "";
    this.slug = "";
    this.currentEpisode = "";
    this.quality = "";
    this.language = "";
    this.year = "";
    this.listType = "";
    this.totalUploadEpisodes = 0;
    this.clickedEpisode = 0;
    this.process = "";
    this.createdAt = "";
    this.updatedAt = "";
    this.__v = 0;
  }
}
