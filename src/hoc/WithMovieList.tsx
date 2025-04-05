import ActivityIndicator from '@components/ActivityIndicator';
import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {Movie} from '@custom_types/api/tmdb';

interface WithMovieListProps {
  category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
  fetchFunction: (page: number) => Promise<any>;
}

interface MovieListScreenProps {
  category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
  movies: Movie[];
  loading: boolean;
  onLoadMore?: () => void;
}

function withMovieList<P extends object>(
  WrappedComponent: React.ComponentType<MovieListScreenProps>,
) {
  return (config: WithMovieListProps): React.ComponentType<P> => {
    return function WithMovieListComponent(props: P) {
      const {data, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['movies', config.category],
        queryFn: ({pageParam = 1}) => config.fetchFunction(pageParam),
        getNextPageParam: lastPage =>
          lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        initialPageParam: 1,
      });

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
