export interface MovieDetailsModel {
  status: string;
  movie: MovieDetail;
}

export interface MovieDetail {
  id: string;
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
  category: Record<string, CategoryGroup>;
  episodes: Episode[];
}

interface CategoryGroup {
  group: Group;
  list: CategoryItem[];
}

interface Group {
  id: string;
  name: string;
}

interface CategoryItem {
  id: string;
  name: string;
}

interface Episode {
  server_name: string;
  items: EpisodeItem[];
}

export interface EpisodeItem {
  name: string;
  slug: string;
  embed: string;
  m3u8: string;
}
