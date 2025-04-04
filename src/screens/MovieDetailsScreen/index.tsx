import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { renderTMDBImage } from '@app_utils/helperfuncs';
import {RootStackParamList, MovieDetailsProps } from '@navigators/index';
import palette from '@styles/palette';
import LinearGradient from 'react-native-linear-gradient';
import Text from '@components/Text';
import Button from '@components/Button';
import Tag from '@components/Tag';
import globalStyles from '@styles/globalStyles';
import Screen from '@components/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import asyncStorageKeys from '@app_utils/asynStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getMovieTrailer from '@api/GetMovieTrailer';
import { useOrientation } from '@hooks/useOrientation';

type Genre = {
  id: number;
  name: string;
  color: string;
};



const GENRES: Record<string, string> = {
  Action: palette.tag_cyan,
  Thriller: palette.tag_pink,
  Science: palette.tag_purple,
  Fiction: palette.tag_gold,
};

const MovieDetailsScreen: React.FC<MovieDetailsProps> = ({ route }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const isLandscape = useOrientation();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadGenres = async () => {
      const cachedGenres = await AsyncStorage.getItem(asyncStorageKeys.movieGenres);
      const cachedGenresList = JSON.parse(cachedGenres || '[]');
      setGenres(cachedGenresList);
    };
    loadGenres();
  }, []);

  useEffect(()=>{
    const getTrailer = async (id: number) => {
      const trailer = await getMovieTrailer(id);
      setTrailerKey(trailer.key);
    };
    if(route.params.id){
      getTrailer(route.params.id);
    }
  }, [route.params.id, route.params.video]);

  const handleBookSeats = () => {
    navigation.navigate('SelectCinema', { title: route.params.title });
  };

  const handleWatchTrailer = () => {
    navigation.navigate('Trailer', { videoKey: trailerKey || '' });
  };


  return (
    <Screen horizontalPadding={0} showNavbar title="Watch" transparentNavbar centerTitle={false}>
      <View style={[styles.container, isLandscape && styles.landscapeContainer]}>
        <View style={[styles.headerContainer, isLandscape && styles.landscapeHeaderContainer]}>
          <ImageBackground
            source={{ uri: renderTMDBImage(route.params.posterUrl, 500) || '' }}
            style={[styles.posterImage, isLandscape && styles.landscapePosterImage]}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', '#000000']}
              style={styles.gradient}
            >
              <View style={styles.heroContentContainer}>
                <Button variant="primary" title="Get Tickets" onPress={handleBookSeats} />
                <Button variant="secondary" title="Watch Trailer" onPress={handleWatchTrailer} leftIcon={'play'} disabled={!trailerKey} />
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <ScrollView
          style={[styles.contentContainer, isLandscape && styles.landscapeContentContainer]}
          contentContainerStyle={isLandscape && styles.landscapeContentScrollContainer}
        >
          <Text style={styles.genresSection} variant="primary">Genres</Text>
          <View style={styles.genresContainer}>
            {route.params.genre_ids.map((genreId) => {
              const genre = genres.find((g) => g.id === genreId);
              return (
                <Tag key={genreId} label={genre?.name || 'Unknown'} color={GENRES[genre?.name || 'Unknown'] || palette.surface_primary} />
              );
            })}
          </View>
          <View style={[styles.divider, globalStyles.divider]} />
          <Text variant="primary">Overview</Text>
          <View style={styles.descriptionContainer}>
            <Text variant='secondary'>
              {route.params.description}
            </Text>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    alignItems: 'center',
  },
  posterImage: {
    width: '100%',
    height: 500,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  releaseDate: {
    fontSize: 16,
    color: '#CCCCCC',
    marginTop: 8,
  },
  ticketButton: {
    backgroundColor: '#1CD6CE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '100%',
    marginTop: 20,
  },
  ticketButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  trailerButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  trailerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroContentContainer: {
    gap: 10,
    width: 243,
    marginBottom: 34,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
  },
  genresSection: {
    marginTop: 27,
  },
  genresContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
    marginTop: 14,
  },
  genreTag: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    marginTop: 22,
    marginBottom: 15,
  },
  descriptionContainer: {
    marginTop: 14,
    paddingBottom: 20,
  },
  landscapeContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  landscapeHeaderContainer: {
    width: '50%',
    height: '100%',
  },
  landscapePosterImage: {
    height: '100%',
  },
  landscapeContentContainer: {
    width: '50%',
    height: '100%',
    paddingTop: 20,
  },
  landscapeContentScrollContainer: {
    paddingBottom: 40,
  },
});

export default MovieDetailsScreen;
