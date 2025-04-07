import React from 'react';
import {FlatList, StyleSheet, View, Image, Pressable} from 'react-native';
import {SearchResult} from '@custom_types/api/tmdb';
import Text from '@components/Text';
import {renderTMDBImage} from '@app_utils/helperfuncs';
import palette from '@styles/palette';
import ActivityIndicator from '@components/ActivityIndicator';
import {format} from 'date-fns';
interface SearchResultListProps {
  data: SearchResult[];
  onItemPress: (item: SearchResult) => void;
  isResultMode: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  data,
  onItemPress,
  isResultMode,
  onLoadMore,
  isLoadingMore = false,
}) => {
  const renderItem = ({item, index}: {item: SearchResult; index: number}) => {
    const title = item.title || item.name || '';
    const imageUrl = renderTMDBImage(item.backdrop_path || '', 500);

    const handleItemPress = () => {
      onItemPress?.(item);
    };

    return (
      <Pressable
        style={[
          styles.itemContainer,
          index === 0 && styles.firstItemContainer,
          index === data.length - 1 && styles.lastItemContainer,
        ]}
        onPress={handleItemPress}>
        {imageUrl ? (
          <Image
            source={{uri: imageUrl}}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.posterPlaceholder]} />
        )}
        <View style={styles.contentContainer}>
          <Text
            variant="primary"
            size="large"
            weight="SemiBold"
            numberOfLines={1}
            style={styles.text}>
            {title}
          </Text>
          {item.release_date && (
            <Text variant="secondary" size="small" weight="Medium">
              {format(new Date(item?.release_date), 'MMM d, yyyy')}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderListHeader = () => {
    if (isResultMode) {
      return <></>;
    }
    return (
      <View style={styles.listHeader}>
        <Text variant="primary" size="small" weight="Medium">
          Top Results
        </Text>
        <View style={styles.listHederDivider} />
      </View>
    );
  };

  const renderFooter = () => {
    if (!isLoadingMore || !isResultMode) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={renderListHeader}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={renderFooter}
      onEndReached={isResultMode ? onLoadMore : undefined}
      onEndReachedThreshold={0.5}
      keyboardShouldPersistTaps="always"
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  listHeader: {
    marginTop: 30,
  },
  listHederDivider: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    width: '100%',
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  firstItemContainer: {
    marginTop: 20,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  poster: {
    width: 130,
    height: 100,
    borderRadius: 10,
  },
  posterPlaceholder: {
    width: 130,
    height: 100,
    borderRadius: 10,
    backgroundColor: palette.disabled,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 21,
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    // flex: 1,
  },
  separator: {
    height: 20,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  dotsContainer: {
    width: 20,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    marginBottom: 75,
  },
  lastItemContainer: {
    marginBottom: 20,
  },
});

export default SearchResultList;
