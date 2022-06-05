import React from 'react';
import {TouchableOpacity} from 'react-native';
import {EyeSvg} from 'src/assets/svg';

export const EyeComponent = ({isSecureText}) => {
  const isVisibleHandle = () => {
    isSecureText(state => !state);
  };

  return (
    <TouchableOpacity
      style={{position: 'absolute', top: '40%', right: '5%'}}
      onPress={isVisibleHandle}
    >
      <EyeSvg />
    </TouchableOpacity>
  );
};
