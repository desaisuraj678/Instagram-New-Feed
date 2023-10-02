import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Colors } from '../theme/Colors';

function SecondaryButton({
  label,
  onPressHandler,
  disabled = false,
}: {
  label: string;
  onPressHandler: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPressHandler}
      hitSlop={{top: 10, right: 10, left: 10, bottom: 10}}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

export default SecondaryButton;

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.color_FF0000,
  },
});
