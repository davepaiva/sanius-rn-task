import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { TrailerProps } from '@navigators/index';
import Orientation from 'react-native-orientation-locker';

const TrailerScreen = ({ route, navigation }: TrailerProps) => {
  const { videoKey } = route.params;
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    // Handle dimension changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    setTimeout(() => {
      Orientation.lockToLandscape();
    }, 1000);

    return () => {
      Orientation.unlockAllOrientations();
      subscription.remove();
    };
  }, []);

  const handleDone = () => {
    navigation.goBack();
  };

  const handleChangeState = (state: string) => {
    if (state === 'ended') {
      handleDone();
    }
  };

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={dimensions.height}
        width={dimensions.width}
        play={true}
        videoId={videoKey}
        webViewProps={{
          containerStyle: styles.playerContainer,
        }}
        onChangeState={handleChangeState}
      />
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  playerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  doneButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TrailerScreen;