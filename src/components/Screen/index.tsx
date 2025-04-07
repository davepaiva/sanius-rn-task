import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from '../Text';
import Icon from '@react-native-vector-icons/ionicons';
import palette from '@styles/palette';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface ScreenProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  title?: string;
  horizontalPadding?: number;
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
  horizontalPadding = 16,
  showBackButton = true,
  rightIcon,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderNavBarContent = () => (
    <>
      {showBackButton ? (
        <TouchableOpacity
          testID="back-button"
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="chevron-back" size={20} color={'#000000'} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <View
        style={[
          styles.titleContainer,
          styles.centerTitle,
          !showBackButton && styles.titleWithoutBack,
        ]}>
        <Text size="large" weight="Medium" style={styles.title}>
          {title}
        </Text>
      </View>

      {rightIcon ? (
        <TouchableOpacity
          testID="right-icon"
          onPress={rightIcon.onPress}
          style={styles.rightButton}>
          <Icon name={rightIcon.name as any} size={18.9} color={'#000000'} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButton} />
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#FFFFFF" />
      {Platform.OS === 'ios' && (
        <View style={[styles.statusBar, {height: insets.top}]} />
      )}
      {showNavbar && (
        <View style={[styles.navbar]}>{renderNavBarContent()}</View>
      )}

      <View
        style={[
          styles.contentContainer,
          {paddingHorizontal: horizontalPadding},
        ]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: 64,
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
  title: {
    color: '#000000',
  },
  subtitle: {
    marginTop: 6,
    color: palette.primary,
  },
  statusBar: {
    backgroundColor: '#FFFFFF',
  },
});

export default Screen;
