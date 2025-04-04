export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  export interface SearchResult {
    backdrop_path: string | null;
    id: number;
    title?: string;
    name?: string;
    original_title?: string;
    original_name?: string;
    overview: string;
    poster_path: string | null;
    media_type: string;
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date?: string;
    first_air_date?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
  }

  export interface GenreList{
    id: number,
    name: string
  }

  export interface MovieVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }
