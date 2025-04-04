import showToast from '@app_utils/Snackbar';
import api, {APIEndpoints} from './index';
import { SearchResult } from '@custom_types/api/tmdb';

interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

const getMovieSearchResults = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  try {
    const response = await api.get(APIEndpoints.SEARCH, {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page,
      },
    });
    const data: SearchResponse = await response.data;
    return data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    showToast('Error in getting search results');
    throw error;
  }
};

export default getMovieSearchResults;
