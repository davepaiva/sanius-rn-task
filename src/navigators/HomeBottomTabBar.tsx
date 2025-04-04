import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '@screens/DashboardScreen';
import MediaLibraryScreen from '@screens/MediaLibraryScreen';
import MoreScreen from '@screens/MoreScreen';
import BottomTabBar from '@components/BottomTabBar';
import WatchScreen from '@screens/WatchScreen';

export type HomeBottomTabBarParamList = {
  Dashboard: undefined;
  Watch: undefined;
  Media: undefined;
  More: undefined;
};



const BottomTabNavigator = createBottomTabNavigator<HomeBottomTabBarParamList>();


const HomeTabNavigator = () => {
  return (
    <BottomTabNavigator.Navigator initialRouteName="Watch" tabBar={BottomTabBar} screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: 'black' } }}>
      <BottomTabNavigator.Screen name="Dashboard" component={DashboardScreen} />
      <BottomTabNavigator.Screen name="Watch" component={WatchScreen} />
      <BottomTabNavigator.Screen name="Media" component={MediaLibraryScreen} />
      <BottomTabNavigator.Screen name="More" component={MoreScreen} />
    </BottomTabNavigator.Navigator>
  );
};


export default HomeTabNavigator;
