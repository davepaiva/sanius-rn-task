import showToast from '@app_utils/Snackbar';
import api, { APIEndpoints } from './index';
import { GenreList } from '@custom_types/api/tmdb';

interface GenreListResponse{
  genres: GenreList[];
}

const getTvGenreList = async (): Promise<GenreListResponse> => {
  try {
    const response = await api.get(APIEndpoints.TV_GENRES, {
      params: { language: 'en-US' }
    });
    const data: GenreListResponse = await response.data;
    return data;
  } catch (error) {
    showToast('Error in getting genre list');
    throw error;
  }
};

export default getTvGenreList;
