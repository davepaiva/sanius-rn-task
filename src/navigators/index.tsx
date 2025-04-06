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
    releaseDate: string;
    voteAverage: number;
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
      </RootStack.Navigator>
    </>
  );
};

export default RootStackNavigator;
