import {ActivityIndicator, SafeAreaView} from 'react-native';
import React, {memo} from 'react';
import {GeneralStyles} from 'src/assets/generalStyles';

export const Indicator = memo(({children, isShow, size, color, height}) => {
  return isShow ? (
    <SafeAreaView style={[GeneralStyles.flexContainer, {height}]}>
      <ActivityIndicator size={size} color={color} />
    </SafeAreaView>
  ) : (
    <>{children}</>
  );
});
