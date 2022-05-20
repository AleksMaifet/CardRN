import {ActivityIndicator, View} from 'react-native';
import React, {memo} from 'react';
import {GeneralStyles} from 'src/assets/generalStyles';

export const Indicator = memo(({children, isShow, size, color, height}) => {
  return isShow ? (
    <View style={[GeneralStyles.flexContainer, {height}]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  ) : (
    <>{children}</>
  );
});
