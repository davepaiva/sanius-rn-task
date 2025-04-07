export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  video: boolean;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}
