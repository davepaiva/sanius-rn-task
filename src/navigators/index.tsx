import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import MovieDetailsScreen from '@screens/MovieDetailsScreen';
import HomeScreen from '@screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  MovieDetails: {
    id: number;
    title: string;
    posterUrl: string;
    description: string;
    genre_ids: number[];
    video: boolean;
  };
  SelectCinema: {
    title: string;
  };
  BookSeats: {
    hall: string;
    time: string;
    date: string;
    price: number;
    movieTitle: string;
  };
  Trailer: {
    videoKey: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type MovieDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>;
export type BookSeatsProps = NativeStackScreenProps<
  RootStackParamList,
  'BookSeats'
>;
export type SelectCinemaProps = NativeStackScreenProps<
  RootStackParamList,
  'SelectCinema'
>;
export type TrailerProps = NativeStackScreenProps<
  RootStackParamList,
  'Trailer'
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
      </RootStack.Navigator>
    </>
  );
};

export default RootStackNavigator;
