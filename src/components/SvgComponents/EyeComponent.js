import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {EyeSvg} from 'src/assets/svg';

export const EyeComponent = ({isSecureText}) => {
  const isVisibleHandle = () => {
    isSecureText(state => !state);
  };

  return (
    <TouchableOpacity style={styles.svgEye} onPress={isVisibleHandle}>
      <EyeSvg />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  svgEye: {
    position: 'absolute',
    top: '40%',
    right: '5%',
  },
});
