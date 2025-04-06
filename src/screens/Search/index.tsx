import React, {useState, useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar, Platform, Pressable} from 'react-native';
import SearchBar from './components/Searchbar';
import getMovieSearchResults from '@api/getMovieSearchResults';
import {SearchResult} from '@custom_types/api/tmdb';
import ActivityIndicator from '@components/ActivityIndicator';
import SearchResultList from './components/SearchResultList';
import palette from '@styles/palette';
import Text from '@components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@navigators/index';
import Screen from '@components/Screen';
import {useInfiniteQuery} from '@tanstack/react-query';

interface SearchViewProps {}

const SearchScreen: React.FC<SearchViewProps> = ({}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isResultMode, setIsResultMode] = useState(false);
  const isResultModeRef = useRef(false);
  const isFocusedRef = useRef(useIsFocused());

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  // React Query for search results
  const {
    data: searchData,
    isLoading: isQueryLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['movieSearch', searchQuery],
    queryFn: ({pageParam = 1}) => getMovieSearchResults(searchQuery, pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: searchQuery.length > 2,
  });

  // Flatten the search results from all pages
  const searchResults = searchData?.pages.flatMap(page => page.results) || [];
  const totalResults = searchData?.pages[0]?.total_results || 0;

  useEffect(() => {
    isResultModeRef.current = isResultMode;
  }, [isResultMode]);

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  const handleOnSearchTextChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleOnSearchResultMode = (resultMode: boolean) => {
    if (!resultMode) {
      setSearchQuery('');
    }
    setIsResultMode(resultMode);
  };

  const handleTurnOffSearchResultMode = () => {
    setIsResultMode(false);
  };

  const handleOnSearchResultItemPress = (item: SearchResult) => {
    navigation.navigate('MovieDetails', {
      title: item.title || '',
      posterUrl: item.poster_path || '',
      description: item.overview,
      genre_ids: item.genre_ids,
      video: item.video || false,
      id: item.id,
      releaseDate: item.release_date || '',
      voteAverage: item.vote_average,
    });
  };

  const renderContent = () => {
    switch (true) {
      case searchResults.length > 0:
        return (
          <SearchResultList
            data={searchResults}
            isResultMode={isResultMode}
            onItemPress={handleOnSearchResultItemPress}
            onLoadMore={handleLoadMore}
            isLoadingMore={isFetchingNextPage}
          />
        );
      case searchQuery.length === 0 && !isQueryLoading:
        return (
          <View style={styles.placeholderText}>
            <Text variant="secondary">Search results will appear here</Text>
          </View>
        );
      case !isQueryLoading &&
        searchQuery.length > 0 &&
        searchResults.length === 0:
        return (
          <View style={styles.placeholderContainer}>
            <Text variant="primary" size="large">
              No results found
            </Text>
          </View>
        );
      case isQueryLoading:
      default:
        return (
          <View style={styles.placeholderContainer}>
            <ActivityIndicator />
          </View>
        );
    }
  };

  return (
    <Screen showBackButton showNavbar title="Search">
      {!isResultMode ? (
        <View style={styles.searchBarContainer}>
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleOnSearchTextChange}
            toggleResultMode={handleOnSearchResultMode}
            autoFocus={true}
          />
        </View>
      ) : (
        <View style={styles.resultNavBarContainer}>
          <Pressable
            onPress={handleTurnOffSearchResultMode}
            style={styles.resultNavbarBackButton}>
            <Icon name="chevron-left" size={30} color={palette.text_primary} />
          </Pressable>
          <Text variant="primary" size="large" weight="Medium">
            {totalResults} Results Found
          </Text>
        </View>
      )}
      <View style={styles.container}>{renderContent()}</View>
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: palette.surface_primary,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    marginHorizontal: -16,
    paddingBottom: 16,
  },
  searchScreenContainer: {
    flex: 1,
  },
  resultNavBarContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight || 25) + 8.2 : 0,
    paddingBottom: 19,
    paddingHorizontal: 20,
  },
  resultNavbarBackButton: {
    width: 30,
    height: 30,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surface_primary,
  },
  placeholderText: {
    marginTop: '10%',
  },
});
