import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import Text from '@components/Text';
import getUpcomingMovies from '@api/getUpcomingMovies';
import MovieListItem from './components/UpcomingMovieListItem';
import { Movie } from '@custom_types/api/tmdb';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigators/index';
import Screen from '@components/Screen';
import SearchView from './components/SearchView';
import ActivityIndicator from '@components/ActivityIndicator';

const WatchScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isUpcomingLoading, setUpcomingLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpcomingLoadingMore, setUpcomingLoadingMore] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocusedRef = useRef(useIsFocused());
  const isFocused = useIsFocused();

  const searchModeRef = useRef(false);

  useEffect(() => {
    searchModeRef.current = isSearchMode;
  }, [isSearchMode]);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);



  const fetchMovies = async (page: number, isLoadingMore = false) => {
    try {
      if (!isLoadingMore) {
        setUpcomingLoading(true);
      }
      const data = await getUpcomingMovies(page);
      if (isLoadingMore) {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      } else {
        setMovies(data.results);
      }
      setHasMorePages(data.page < data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setUpcomingLoading(false);
      setUpcomingLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const handleToggleSearchMode = () => {
    setIsSearchMode(!isSearchMode);
  }

  const handleLoadMore = useCallback(() => {
    if (!isUpcomingLoadingMore && hasMorePages && !isUpcomingLoading) {
      setUpcomingLoadingMore(true);
      setCurrentPage(prev => prev + 1);
      fetchMovies(currentPage + 1, true);
    }
  }, [isUpcomingLoadingMore, hasMorePages, currentPage, isUpcomingLoading]);


  const renderFooter = () => {
    if (!isUpcomingLoadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: Movie, index: number }) => {
    const handleMoviePress = () => {
        navigation.navigate('MovieDetails',
          {
            title: item.title,
            posterUrl: item.poster_path,
            description: item.overview,
            genre_ids: item.genre_ids,
            video: item.video,
            id: item.id,
          });
    };

    return (
    <MovieListItem
      key={item.id}
      title={item.title}
      posterUrl={item.backdrop_path}
      onPress={handleMoviePress}
      isFirstItem={index === 0}
    />
    );
  };



  if (isSearchMode) {
    return (
      <SearchView turnOffSearchMode={handleToggleSearchMode} isSearchMode={isSearchMode} />
    );
  }
  return (
    <Screen showNavbar title="Watch" showBackButton={false} centerTitle={false} rightIcon={{ name: 'search', onPress: handleToggleSearchMode }}>
      <View style={styles.container}>
        {
          isUpcomingLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={movies}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={<Text>No movies available</Text>}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              // contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default WatchScreen;
