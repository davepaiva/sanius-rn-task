import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '@components/BottomTabBar';
import MovieListScreen from '@screens/HomeScreen/components/MovieListSreen';
import withMovieList from '@hoc/WithMovieList';
import getNowPlayingMovies from '@api/getNowPlayingMovies';
import getPopularMovies from '@api/getPopularMovies';
import getTopRatedMovies from '@api/getTopRatedMovies';
import getUpcomingMovies from '@api/getUpcomingMovies';

export type HomeBottomTabBarParamList = {
  NowPlaying: undefined;
  Popular: undefined;
  TopRated: undefined;
  Upcoming: undefined;
  SavedMovies: undefined;
};

const NowPlayingMoviesScreen = withMovieList<HomeBottomTabBarParamList>(
  MovieListScreen,
)({
  category: 'now_playing',
  fetchFunction: getNowPlayingMovies,
}) as React.ComponentType<object>;

const PopularMoviesScreen = withMovieList<HomeBottomTabBarParamList>(
  MovieListScreen,
)({
  category: 'popular',
  fetchFunction: getPopularMovies,
}) as React.ComponentType<object>;

const TopRatedMoviesScreen = withMovieList(MovieListScreen)({
  category: 'top_rated',
  fetchFunction: getTopRatedMovies,
});

const UpcomingMoviesScreen = withMovieList<HomeBottomTabBarParamList>(
  MovieListScreen,
)({
  category: 'upcoming',
  fetchFunction: getUpcomingMovies,
}) as React.ComponentType<object>;

const SavedMoviesScreen = withMovieList<HomeBottomTabBarParamList>(
  MovieListScreen,
)({
  category: 'saved_movies',
}) as React.ComponentType<object>;

const BottomTabNavigator =
  createBottomTabNavigator<HomeBottomTabBarParamList>();

const HomeTabNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="NowPlaying"
      tabBar={BottomTabBar}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'black'},
        tabBarShowLabel: false,
      }}>
      <BottomTabNavigator.Screen
        name="NowPlaying"
        component={NowPlayingMoviesScreen}
      />
      <BottomTabNavigator.Screen
        name="Popular"
        component={PopularMoviesScreen}
      />
      <BottomTabNavigator.Screen
        name="TopRated"
        component={TopRatedMoviesScreen}
      />
      <BottomTabNavigator.Screen
        name="Upcoming"
        component={UpcomingMoviesScreen}
      />
      <BottomTabNavigator.Screen
        name="SavedMovies"
        component={SavedMoviesScreen}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default HomeTabNavigator;
