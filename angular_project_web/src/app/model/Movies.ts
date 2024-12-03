export interface APIMoviesModel {
  status: string;
  paginate: Paginate;
  cat: Category;
  items: any;
}

interface Paginate {
  current_page: number;
  total_page: number;
  total_items: number;
  items_per_page: number;
}

interface Category {
  name: string;
  title: string;
  slug: string;
}

export interface MovieList {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
}

export interface TvList {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
}

// export class Customer {
//   custId: number;
//   name: String;
//   MobileNo: 
//   constructor() {

//   }
// }

