import React from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import Text from '@components/Text';
type Category = {
  id: number;
  name: string;
  background: any;
}

const categoryBackgrounds: { [key: string]: any } = {
  Comedies: require('../../../../assets/images/movie_categories/category_comedies.png'),
  Crime: require('../../../../assets/images/movie_categories/category_crime.png'),
  Family: require('../../../../assets/images/movie_categories/category_family.png'),
  Documentaries: require('../../../../assets/images/movie_categories/category_documentaries.png'),
  Dramas: require('../../../../assets/images/movie_categories/category_dramas.png'),
  Fantasy: require('../../../../assets/images/movie_categories/category_fantasy.png'),
  Holidays: require('../../../../assets/images/movie_categories/category_holidays.png'),
  Horror: require('../../../../assets/images/movie_categories/category_horror.png'),
  SciFi: require('../../../../assets/images/movie_categories/category_scifi.png'),
  Thriller: require('../../../../assets/images/movie_categories/category_thriller.png'),
};

const categories = [
  { id: 1, name: 'Comedies', background: categoryBackgrounds.Comedies },
  { id: 2, name: 'Crime', background: categoryBackgrounds.Crime },
  { id: 3, name: 'Family', background: categoryBackgrounds.Family },
  { id: 4, name: 'Documentaries', background: categoryBackgrounds.Documentaries },
  { id: 5, name: 'Dramas', background: categoryBackgrounds.Dramas },
  { id: 6, name: 'Fantasy', background: categoryBackgrounds.Fantasy },
  { id: 7, name: 'Holidays', background: categoryBackgrounds.Holidays },
  { id: 8, name: 'Horror', background: categoryBackgrounds.Horror },
  { id: 9, name: 'SciFi', background: categoryBackgrounds.SciFi },
  { id: 10, name: 'Thriller', background: categoryBackgrounds.Thriller },
];


const CategoryList = () => {
  const renderCategoryCard = ({ item }: { item: Category }) => (
    <View
      style={styles.cardContainer}
    >
      <ImageBackground
        source={categoryBackgrounds[item.name]}
        style={styles.cardBackground}
        imageStyle={styles.cardImage}
      >
        <View style={styles.overlay}>
          <Text variant="light" weight="Medium" size="medium" >{item.name}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryCard}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    aspectRatio: 16 / 9,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardImage: {
    borderRadius: 10,
  },
  overlay: {
    paddingLeft: 10,
    paddingBottom: 20,
  },
});

export default CategoryList;
