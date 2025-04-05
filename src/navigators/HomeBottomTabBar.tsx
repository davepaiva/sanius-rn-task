import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from '@components/BottomTabBar';
import WatchScreen from '@screens/WatchScreen';

export type HomeBottomTabBarParamList = {
  Dashboard: undefined;
  Watch: undefined;
  Media: undefined;
  More: undefined;
};

const BottomTabNavigator =
  createBottomTabNavigator<HomeBottomTabBarParamList>();

const HomeTabNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Watch"
      tabBar={BottomTabBar}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'black'},
      }}>
      <BottomTabNavigator.Screen name="Watch" component={WatchScreen} />
    </BottomTabNavigator.Navigator>
  );
};

export default HomeTabNavigator;
