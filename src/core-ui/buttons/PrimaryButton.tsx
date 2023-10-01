import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {screenWidth} from '../../core-utils/constants';

function PrimaryButton({
  header,
  onPressHandler,
  disabled,
  ...props
}: {
  header: string;
  onPressHandler: () => void;
  disabled: boolean;
}) {
  return (
    <TouchableHighlight
      style={styles.btnStyle}
      onPress={onPressHandler}
      disabled={disabled}
      {...props}>
      <Text style={styles.text}>{header}</Text>
    </TouchableHighlight>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  btnStyle: {
    height: 48,
    width: screenWidth - 32,
    backgroundColor: '#1F41BB',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 32,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
