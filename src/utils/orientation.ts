import { Dimensions } from 'react-native';
import Orientation from 'react-native-orientation-locker';

export const lockToLandscape = () => {
  Orientation.lockToLandscape();
};

export const lockToPortrait = () => {
  Orientation.lockToPortrait();
};

export const unlockOrientation = () => {
  Orientation.unlockAllOrientations();
};

export const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};
