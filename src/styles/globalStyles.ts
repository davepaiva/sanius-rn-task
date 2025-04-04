import { StyleSheet } from 'react-native';
import palette from './palette';

const globalStyles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  divider:{
    height: 1,
    backgroundColor: palette.divider,
    opacity: 0.05,
  },
});

export default globalStyles;
