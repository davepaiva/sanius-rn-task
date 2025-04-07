import {movieListCategory} from '@custom_types/movieListScreen';

const renderTMDBImage = (endpoint: string, size?: number) => {
  return endpoint
    ? `https://image.tmdb.org/t/p/w${size || 500}/${endpoint}`
    : null;
};

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => func(...args), waitFor);
  };
};

const getMovieListScreenTitle = (category: movieListCategory) => {
  switch (category) {
    case 'now_playing':
      return 'Now playing';
    case 'popular':
      return 'Popular';
    case 'top_rated':
      return 'Top rated';
    case 'upcoming':
      return 'Upcoming';
    case 'saved_movies':
      return 'Saved Movies';
  }
};

export {renderTMDBImage, debounce, getMovieListScreenTitle};
