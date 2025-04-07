import showToast from '@app_utils/Snackbar';
import api, {APIEndpoints} from './index';
import {Movie} from '@custom_types/api/tmdb';

interface PopularResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const getPopularMovies = async (page: number = 1): Promise<PopularResponse> => {
  try {
    const response = await api.get(APIEndpoints.POPULAR, {
      params: {language: 'en-US', page},
    });
    const data: PopularResponse = await response.data;
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    showToast('Error in getting movie list');
    throw error;
  }
};

export default getPopularMovies;
