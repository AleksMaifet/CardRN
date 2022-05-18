import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {PhotoSvg} from 'src/assets/svg';

export const PhotoUploadComponent = ({}) => {
  const isVisibleHandle = () => {};

  return (
    <TouchableOpacity style={styles.svgEye} onPress={isVisibleHandle}>
      <PhotoSvg />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  svgEye: {
    position: 'absolute',
    top: '80%',
    right: '5%',
  },
});
