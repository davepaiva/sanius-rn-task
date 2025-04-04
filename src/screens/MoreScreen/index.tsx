import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '@components/Text';

const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome More!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MoreScreen;
