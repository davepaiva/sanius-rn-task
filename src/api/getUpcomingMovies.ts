import showToast from '@app_utils/Snackbar';
import api, {APIEndpoints} from './index';
import { Movie } from '@custom_types/api/tmdb';

interface Dates {
  maximum: string;
  minimum: string;
}


interface NowPlayingResponse {
  dates: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const getUpcomingMovies = async (page: number = 1): Promise<NowPlayingResponse> => {
  try {
    const response = await api.get(APIEndpoints.UPCOMING, {params: {language: 'en-US', page}});
    const data: NowPlayingResponse = await response.data;
    return data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    showToast('Error in getting movie list');
    throw error;
  }
};


export default getUpcomingMovies;
