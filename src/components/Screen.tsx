import React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from './Text';
import Icon from 'react-native-vector-icons/Ionicons';
import palette from '@styles/palette';

interface ScreenProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  title?: string;
  subtitle?: string;
  horizontalPadding?: number;
  centerTitle?: boolean;
  transparentNavbar?: boolean;
  showBackButton?: boolean;
  rightIcon?: {
    name: string;
    onPress: () => void;
  };
}

const Screen: React.FC<ScreenProps> = ({
  children,
  showNavbar = false,
  title,
  subtitle,
  horizontalPadding = 20,
  centerTitle = true,
  transparentNavbar = false,
  showBackButton = true,
  rightIcon,
}) => {
  const navigation = useNavigation();

  const renderNavBarContent = () => (
    <>
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon
            name="chevron-back"
            size={20}
            color={transparentNavbar ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <View
        style={[
          styles.titleContainer,
          centerTitle ? styles.centerTitle : styles.leftTitle,
          !showBackButton && styles.titleWithoutBack,
        ]}
      >
        <Text
          size="large"
          weight='Medium'
          style={[
            { color: transparentNavbar ? '#FFFFFF' : '#000000' },
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            size="small"
            weight="Medium"
            style={[
              {color: transparentNavbar ? '#FFFFFF99' : palette.primary},
              styles.subtitle,
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightIcon ? (
        <TouchableOpacity
          onPress={rightIcon.onPress}
          style={styles.rightButton}
        >
          <Icon
            name={rightIcon.name}
            size={18.9}
            color={transparentNavbar ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButton} />
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={transparentNavbar ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      {!transparentNavbar && showNavbar && (
        <View
          style={[
            styles.navbar,
            styles.solidNavbar,
          ]}
        >
          {renderNavBarContent()}
        </View>
      )}

      <View style={[styles.contentContainer, { paddingHorizontal: horizontalPadding }]}>
        {children}
      </View>

      {transparentNavbar && showNavbar && (
        <View
          style={[
            styles.navbar,
            styles.transparentNavbar,
            styles.absoluteNavbar,
          ]}
        >
          {renderNavBarContent()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    minHeight: 87,
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  absoluteNavbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  transparentNavbar: {
    backgroundColor: 'transparent',
  },
  solidNavbar: {
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  centerTitle: {
    alignItems: 'center',
  },
  leftTitle: {
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  titleWithoutBack: {
    marginLeft: 0,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: palette.surface_primary,
  },
  subtitle: {
    marginTop: 6,
  },
});

export default Screen;
