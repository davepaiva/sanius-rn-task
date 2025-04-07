import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import MovieDetailsScreen from '@screens/MovieDetailsScreen';
import HomeScreen from '@screens/HomeScreen';
import SearchScreen from '@screens/Search';
export type RootStackParamList = {
  Search: undefined;
  Home: undefined;
  MovieDetails: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    genre_ids: number[];
    video: boolean;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type MovieDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>;

const RootStackNavigator = () => {
  return (
    <>
      <RootStack.Navigator>
        <RootStack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={'MovieDetails'}
          component={MovieDetailsScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={'Search'}
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </>
  );
};

export default RootStackNavigator;
