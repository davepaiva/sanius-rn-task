import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height,
  );

  useEffect(() => {
    const updateOrientation = () => {
      const dimension = Dimensions.get('window');
      setIsLandscape(dimension.width > dimension.height);
    };

    const subscription = Dimensions.addEventListener(
      'change',
      updateOrientation,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return isLandscape;
};
