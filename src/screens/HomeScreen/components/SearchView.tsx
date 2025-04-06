import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Platform, Pressable, BackHandler } from 'react-native';
import CategoryList from './CategoryList';
import SearchBar from './Searchbar';
import getMovieSearchResults from '@api/getMovieSearchResults';
import { SearchResult } from '@custom_types/api/tmdb';
import { debounce } from '@app_utils/helperfuncs';
import ActivityIndicator from '@components/ActivityIndicator';
import SearchResultList from './SearchResultList';
import palette from '@styles/palette';
import Text from '@components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@navigators/index';

interface SearchViewProps {
    isSearchMode: boolean;
    turnOffSearchMode: () => void;
}

const SearchView: React.FC<SearchViewProps> = ({isSearchMode, turnOffSearchMode }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isQueryLoading, setIsQueryLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isResultMode, setIsResultMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const isResultModeRef = useRef(false);
    const isSearchModeRef = useRef(false);
    const isFocusedRef = useRef(useIsFocused());

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const isFocused = useIsFocused();

    useEffect(()=>{
        const backhandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            if(isResultModeRef.current && isFocusedRef.current){
                setIsResultMode(false);
                return true;
            }
            if(isSearchModeRef.current && isFocusedRef.current){
                turnOffSearchMode();
                return true;
            }
            return false;
        });
        return () => {
            backhandler.remove();
        }
    }, []);

    useEffect(()=>{
        isSearchModeRef.current = isSearchMode;
    }, [isSearchMode]);

    useEffect(()=>{
        isResultModeRef.current = isResultMode;
    }, [isResultMode]);

    useEffect(()=>{
        isFocusedRef.current = isFocused;
    }, [isFocused]);

    const debouncedFetchSearchResults = useCallback(
        (query: string) => {
            const fetchSearchResults = async (q: string) => {
                setIsQueryLoading(true);
                const data = await getMovieSearchResults(q);
                setSearchResults(data.results);
                setTotalResults(data.total_results);
                setIsQueryLoading(false);
            };

            debounce(() => {
                if (query.length > 0) {
                    fetchSearchResults(query);
                } else {
                    setSearchResults([]);
                    setIsQueryLoading(false);
                }
            }, 1000)();
        },
        [setIsQueryLoading, setSearchResults]
    );

    const fetchSearchResults = async (q: string, page: number, isLoadingMore = false) => {
        try {
            if (!isLoadingMore) {
                setIsQueryLoading(true);
            }
            const data = await getMovieSearchResults(q, page);
            if (isLoadingMore) {
                setSearchResults(prev => [...prev, ...data.results]);
            } else {
                setSearchResults(data.results);
            }
            setHasMorePages(data.page < data.total_pages);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsQueryLoading(false);
            setIsLoadingMore(false);
        }
    };

    const handleLoadMore = useCallback(() => {
        if (!isLoadingMore && hasMorePages && searchQuery.length > 0) {
            setIsLoadingMore(true);
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchSearchResults(searchQuery, nextPage, true);
        }
    }, [isLoadingMore, hasMorePages, currentPage, searchQuery]);

    const handleOnSearchTextChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
        debouncedFetchSearchResults(query);
    };

    const handleOnSearchResultMode = (isResultMode: boolean) => {
        if(!isResultMode){
            setSearchResults([]);
            setTotalResults(0);
        }
        setIsResultMode(isResultMode);
    };

    const handleTurnOffSearchResultMode = () => {
        setIsResultMode(false);
    }


    const handleOnSearchResultItemPress = (item: SearchResult) => {
        navigation.navigate('MovieDetails', {
            title: item.title || '',
            posterUrl: item.poster_path || '',
            description: item.overview,
            genre_ids: item.genre_ids,
            video: item.video || false,
            id: item.id,
        });
    };

    const renderContent = ()=>{
        switch(true){
            case searchResults.length > 0:
                return (
                    <SearchResultList
                        data={searchResults}
                        isResultMode={isResultMode}
                        onItemPress={handleOnSearchResultItemPress}
                        onLoadMore={handleLoadMore}
                        isLoadingMore={isLoadingMore}
                    />
                );
            case searchQuery.length === 0 && !isQueryLoading:
                return <CategoryList />;
            case !isQueryLoading && searchResults.length === 0:
                return <View style={styles.placeholderContainer}>
                    <Text variant="primary" size="large" weight="Medium">No results found</Text>
                </View>;
            case isQueryLoading:
            default:
                return <View style={styles.placeholderContainer}>
                    <ActivityIndicator />
                </View>;
        }
    };


  return (
    <>
    <StatusBar
     barStyle="dark-content"
     backgroundColor="transparent"
     translucent
   />
   {
    !isResultMode ? (
        <View style={styles.searchBarContainer}>
            <SearchBar searchQuery={searchQuery} onSearch={handleOnSearchTextChange} toggleResultMode={handleOnSearchResultMode} />
        </View>
    ) : (
        <View style={styles.resultNavBarContainer}>
            <Pressable onPress={handleTurnOffSearchResultMode} style={styles.resultNavbarBackButton}>
                <Icon name="chevron-left" size={30} color={palette.text_primary} />
            </Pressable>
            <Text variant="primary" size="large" weight="Medium">{totalResults} Results Found</Text>
    </View>
    )
   }
       <View style={styles.container}>
         {
           renderContent()
         }
       </View>
   </>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: palette.surface_primary,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 25) + 8.2 : 0,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  searchScreenContainer: {
    flex: 1,
  },
  resultNavBarContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 25) + 8.2 : 0,
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
  },
});
