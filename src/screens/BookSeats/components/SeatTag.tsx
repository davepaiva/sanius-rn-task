import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from '@components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import palette from '@styles/palette';

interface SeatTagProps {
  row: number;
  seatNumber: number;
  onCancel: () => void;
}

const SeatTag = ({ row, seatNumber, onCancel }: SeatTagProps) => (
  <View style={styles.seatTag}>
    <Text variant="primary" weight="Medium" size="small">
        <Text variant="primary" weight="Medium" size="large">{seatNumber}/</Text>
      {row} row
    </Text>
    <Pressable onPress={onCancel} hitSlop={8}>
      <Icon name="close" size={16} color={palette.text_primary} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  seatTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface_primary,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 8,
  },
});

export default SeatTag;
