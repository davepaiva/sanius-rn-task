import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const BottomTabBar = ({state, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName = 'home';
        switch (route.name) {
          case 'NowPlaying':
            iconName = 'play-circle-outline';
            break;
          case 'Popular':
            iconName = 'account-group';
            break;
          case 'TopRated':
            iconName = 'star';
            break;
          case 'Upcoming':
            iconName = 'arrow-right-circle';
            break;
          case 'SavedMovies':
            iconName = 'bookmark';
            break;
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}>
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2E2739',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    height: 75,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabLabelFocused: {
    color: '#FFFFFF',
  },
  tabLabelUnfocused: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default BottomTabBar;
