import React from 'react';
import {Text} from 'react-native';

const MockIonicons = ({name}: {name: string}) => (
  <Text testID={`icon-${name}`}>{name}</Text>
);

export default MockIonicons;
