import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GeneralStyles} from 'src/assets/generalStyles';

export const LinearGradientWrapper = ({children, color}) => {
  return (
    <LinearGradient
      colors={color}
      style={[styles.container, GeneralStyles.flexContainer]}
    >
      {children}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
