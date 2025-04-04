import React, { useEffect } from 'react';
import RootStack from '@navigators/index';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import globalStyles from '@styles/globalStyles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import getMovieGenreList from '@api/GetMovieGenreList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorageKeys from '@app_utils/asynStorageKeys';
import getTvGenreList from '@api/GetTvGenreList';


export default function App() {

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const movieGenreList = await getMovieGenreList();
        const tvGenreList = await getTvGenreList();
        const genreList = [...movieGenreList.genres, ...tvGenreList.genres];
        console.log('genreList', genreList);
        AsyncStorage.setItem(asyncStorageKeys.movieGenres, JSON.stringify(genreList));
      } catch (error) {
        console.error('Error fetching genre list:', error);
      }
    };
    fetchGenreList();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.f1}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}




