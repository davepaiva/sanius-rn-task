import showToast from '@app_utils/Snackbar';
import api from './index';
import { MovieVideo } from '@custom_types/api/tmdb';

interface GetMovieTrailerResponse {
  id: number;
  results: MovieVideo[];
}

const getMovieTrailer = async (
  movieId: number,
): Promise<MovieVideo> => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`, {
      params: {
        language: 'en-US',
      },
    });
    const data: GetMovieTrailerResponse = await response.data;
    const trailer = data.results.find(item =>
      (item.type === 'Trailer' || item.type === 'Teaser') &&
      item.site === 'YouTube'
    );
    if (!trailer) {
      throw new Error('No trailer found for this movie');
    }
    return trailer;
  } catch (error) {
    console.error('Error fetching search results:', error);
    showToast('Error in getting search results');
    throw error;
  }
};

export default getMovieTrailer;
