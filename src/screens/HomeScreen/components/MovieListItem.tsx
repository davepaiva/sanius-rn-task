import {renderTMDBImage} from '@app_utils/helperfuncs';
import React from 'react';
import {ImageBackground, StyleSheet, View, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '@components/Text';
interface MovieListItemProps {
  title: string;
  posterUrl: string;
  onPress: () => void;
  isFirstItem: boolean;
  releaseDate: string;
  voteAverage: number;
}

const BORDER_RADIUS = 20;

const MovieListItem: React.FC<MovieListItemProps> = ({
  title,
  posterUrl,
  onPress,
  isFirstItem,
  releaseDate,
  voteAverage,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, isFirstItem && styles.firstItem]}>
      <ImageBackground
        source={{uri: renderTMDBImage(posterUrl, 500) || ''}}
        style={styles.imageBackground}
        resizeMode="cover"
        imageStyle={styles.image}>
        <LinearGradient
          colors={['transparent', '#000000']}
          style={styles.gradient}>
          <View style={styles.contentContainer}>
            <Text
              variant="light"
              weight="Medium"
              size="x_large"
              numberOfLines={2}>
              {title}
            </Text>
            <Text variant="light" size="small" weight="Medium">
              {releaseDate}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: 335,
    width: '100%',
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: 180,
  },
  image: {
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: BORDER_RADIUS,
  },
  contentContainer: {
    padding: 16,
  },
  firstItem: {
    marginTop: 30,
  },
});

export default MovieListItem;
