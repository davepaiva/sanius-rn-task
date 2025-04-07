import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import Text from '../Text';
import palette from '@styles/palette';

interface TagProps {
  label: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Tag: React.FC<TagProps> = ({label, color = palette.primary, style}) => {
  return (
    <View
      testID="tag-container"
      style={[styles.container, {backgroundColor: color}, style]}>
      <Text
        testID="tag-text"
        variant={color === palette.surface_primary ? 'primary' : 'light'}
        size="small"
        weight="SemiBold"
        style={styles.text}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    lineHeight: 20,
  },
});

export default Tag;
