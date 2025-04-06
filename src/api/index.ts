import axios from 'axios';
import Config from 'react-native-config';
import curlirize from 'axios-curlirize';

console.log('BASE_URL: ', Config.TMDB_API_BASE_URL);

const api = axios.create({
  baseURL: Config.TMDB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${Config.TMDB_BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

if (Config.LOG_API_CURLS === 'true') {
  curlirize(api);
}

export enum APIEndpoints {
  NOW_PLAYING = '/movie/now_playing',
  POPULAR = '/movie/popular',
  TOP_RATED = '/movie/top_rated',
  UPCOMING = '/movie/upcoming',
  MOVIE_DETAILS = '/movie',
  SEARCH = '/search/movie',
  TRENDING = '/trending/movie/week',
  MOVIE_GENRES = '/genre/movie/list',
  TV_GENRES = '/genre/tv/list',
  SEARCH_MULTI = '/search/multi',
}

export default api;
