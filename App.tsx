import React, {useEffect} from 'react';
import RootStack from '@navigators/index';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import getMovieGenreList from '@api/getMovieGenreList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorageKeys from '@app_utils/asynStorageKeys';
import getTvGenreList from '@api/getTvGenreList';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const movieGenreList = await getMovieGenreList();
        const tvGenreList = await getTvGenreList();
        const genreList = [...movieGenreList.genres, ...tvGenreList.genres];
        AsyncStorage.setItem(
          asyncStorageKeys.movieGenres,
          JSON.stringify(genreList),
        );
      } catch (error) {
        console.error('Error fetching genre list:', error);
      }
    };
    fetchGenreList();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
