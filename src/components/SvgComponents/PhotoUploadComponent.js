import React from 'react';
import {TouchableOpacity} from 'react-native';
import {PhotoSvg} from 'src/assets/svg';

export const PhotoUploadComponent = ({callback}) => {
  const isVisibleHandle = () => {
    callback();
  };

  return (
    <TouchableOpacity
      style={{position: 'absolute', top: '80%', right: '5%'}}
      onPress={isVisibleHandle}
    >
      <PhotoSvg />
    </TouchableOpacity>
  );
};
