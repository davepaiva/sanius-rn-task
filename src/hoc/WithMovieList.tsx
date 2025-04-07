import ActivityIndicator from '@components/ActivityIndicator';
import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Movie} from '@custom_types/api/tmdb';
import {getSavedMovies} from '@app_utils/sqlite';
import {useFocusEffect} from '@react-navigation/native';

interface WithMovieListProps {
  category:
    | 'now_playing'
    | 'popular'
    | 'top_rated'
    | 'upcoming'
    | 'saved_movies';
  fetchFunction?: (page: number) => Promise<any>;
  // db?: SQLiteDatabase;
}

interface MovieListScreenProps {
  category:
    | 'now_playing'
    | 'popular'
    | 'top_rated'
    | 'upcoming'
    | 'saved_movies';
  movies: Movie[];
  loading: boolean;
  onLoadMore?: () => void;
}

function withMovieList<P extends object>(
  WrappedComponent: React.ComponentType<MovieListScreenProps>,
) {
  return (config: WithMovieListProps): React.ComponentType<P> => {
    return function WithMovieListComponent(props: P) {
      const {data, isLoading, fetchNextPage, hasNextPage, refetch} =
        useInfiniteQuery({
          queryKey: ['movies', config.category],
          queryFn: async ({pageParam = 1}) => {
            if (config.category === 'saved_movies') {
              const savedMovies = await getSavedMovies();
              return {
                results: savedMovies,
                page: 1,
                total_pages: 1,
              };
            }
            if (!config.fetchFunction) {
              throw new Error(
                'fetchFunction is required for non-saved movies categories',
              );
            }
            return config.fetchFunction(pageParam);
          },
          getNextPageParam: lastPage =>
            config.category === 'saved_movies'
              ? undefined
              : lastPage.page < lastPage.total_pages
              ? lastPage.page + 1
              : undefined,
          initialPageParam: 1,
        });

      // Add focus effect to refetch saved movies
      useFocusEffect(
        useCallback(() => {
          if (config.category === 'saved_movies') {
            refetch();
          }
        }, [refetch]),
      );

      const allMovies = data?.pages.flatMap(page => page.results) ?? [];

      const handleLoadMore = useCallback(() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }, [hasNextPage, fetchNextPage]);

      if (isLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <WrappedComponent
          {...(props as P)}
          category={config.category}
          movies={allMovies}
          loading={isLoading}
          onLoadMore={handleLoadMore}
        />
      );
    };
  };
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withMovieList;
