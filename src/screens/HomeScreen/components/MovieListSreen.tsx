import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Text from '@components/Text';
import MovieListItem from './MovieListItem';
import {Movie} from '@custom_types/api/tmdb';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigators/index';
import Screen from '@components/Screen';
import SearchView from './SearchView';
import ActivityIndicator from '@components/ActivityIndicator';
import {movieListCategory} from '@custom_types/movieListScreen';
import {getMovieListScreenTitle} from '@app_utils/helperfuncs';

interface MovieListScreenProps {
  category: movieListCategory;
  movies: Movie[];
  loading: boolean;
  onLoadMore?: () => void;
}

const MovieListScreen = ({
  category,
  movies,
  loading,
  onLoadMore,
}: MovieListScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocusedRef = useRef(useIsFocused());
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  const handleToggleSearchMode = () => {
    navigation.navigate('Search');
  };

  const handleLoadMore = useCallback(() => {
    if (!loading && onLoadMore) {
      onLoadMore();
    }
  }, [loading, onLoadMore]);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  };

  const renderItem = ({item, index}: {item: Movie; index: number}) => {
    const handleMoviePress = () => {
      navigation.navigate('MovieDetails', {
        title: item.title,
        posterUrl: item.poster_path,
        description: item.overview,
        genre_ids: item.genre_ids,
        video: item.video,
        id: item.id,
        releaseDate: item.release_date,
        voteAverage: item.vote_average,
      });
    };

    return (
      <MovieListItem
        key={item.id}
        title={item.title}
        posterUrl={item.backdrop_path}
        onPress={handleMoviePress}
        isFirstItem={index === 0}
        releaseDate={item.release_date}
        voteAverage={item.vote_average}
      />
    );
  };

  return (
    <Screen
      showNavbar
      title={getMovieListScreenTitle(category)}
      showBackButton={false}
      centerTitle={false}
      rightIcon={{name: 'search', onPress: handleToggleSearchMode}}>
      <View style={styles.container}>
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
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default MovieListScreen;
