import {renderTMDBImage} from '@app_utils/helperfuncs';
import React from 'react';
import {ImageBackground, StyleSheet, View, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '@components/Text';
import {format} from 'date-fns';
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
  console.log(`img-`, renderTMDBImage(posterUrl, 500));
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
            <View style={styles.infoContainer}>
              <Text variant="light" size="x_small" weight="Medium">
                {format(new Date(releaseDate), 'MMM d, yyyy')}
              </Text>
              <Text variant="light" size="x_small" weight="Medium">
                Rating {voteAverage?.toFixed(1)}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MovieListItem;
