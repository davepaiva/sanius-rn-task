import showToast from '@app_utils/Snackbar';
import api, {APIEndpoints} from './index';
import {Movie} from '@custom_types/api/tmdb';

interface TopRatedResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const getTopRatedMovies = async (
  page: number = 1,
): Promise<TopRatedResponse> => {
  try {
    const response = await api.get(APIEndpoints.TOP_RATED, {
      params: {language: 'en-US', page},
    });
    const data: TopRatedResponse = await response.data;
    return data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    showToast('Error in getting movie list');
    throw error;
  }
};

export default getTopRatedMovies;
