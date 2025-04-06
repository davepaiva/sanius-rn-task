import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  searchQuery: string;
  toggleResultMode: (isResultMode: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'TV shows, movies and more',
  searchQuery = '',
  toggleResultMode,
}) => {

  const handleSearch = (text: string) => {
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleTurnOnSearchResultMode = () => {
    if(searchQuery.length > 0){
      toggleResultMode(true);
    }
  };


  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        returnKeyType="search"
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={handleSearch}
        onSubmitEditing={handleTurnOnSearchResultMode}
      />
      {searchQuery.length > 0 && (
        <Icon
          name="close"
          size={20}
          color="#666"
          style={styles.clearIcon}
          onPress={() => handleSearch('')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
  clearIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;
