import {Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {SIZES, styles} from 'src/assets/generalStyles';

export const Header = memo(
  ({children, title, callback, primaryCallback, icon, primaryIcon}) => {
    return (
      <>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={callback}>{icon}</TouchableOpacity>
          <View style={[{width: SIZES.width / 1.4}]}>
            <Text
              style={[styles.fonts.h1, primaryIcon && {textAlign: 'center'}]}
            >
              {title}
            </Text>
          </View>
          <TouchableOpacity onPress={primaryCallback}>
            {primaryIcon}
          </TouchableOpacity>
        </View>
        {children}
      </>
    );
  },
);
