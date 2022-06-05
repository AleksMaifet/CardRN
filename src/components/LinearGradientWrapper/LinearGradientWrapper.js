import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from 'src/assets/generalStyles';

export const LinearGradientWrapper = ({children, color}) => {
  return (
    <LinearGradient colors={color} style={[{flex: 1}, styles.flexContainer]}>
      {children}
    </LinearGradient>
  );
};
