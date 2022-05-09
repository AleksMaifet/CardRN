import React from 'react';
import {Eye} from 'src/assets/svg';
import {StyleSheet, TouchableOpacity} from 'react-native';

export const EyeComponent = ({isSecureText}) => {
  const isVisibleHandle = () => {
    isSecureText(state => !state);
  };

  return (
    <TouchableOpacity style={styles.svgEye} onPress={isVisibleHandle}>
      <Eye />
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
