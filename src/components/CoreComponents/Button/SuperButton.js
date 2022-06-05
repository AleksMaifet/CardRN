import React, {memo} from 'react';
import {Pressable, Text} from 'react-native';
import {styles} from 'src/assets/generalStyles';

export const SuperButton = memo(
  ({
    callback,
    text,
    width = 265,
    height = 36,
    backgroundColor,
    color,
    disabled,
  }) => {
    const onPressEvent = () => {
      callback();
    };

    return (
      <Pressable
        style={[
          styles.flexContainer,
          {width, height, backgroundColor, borderRadius: 30},
        ]}
        onPress={onPressEvent}
        disabled={disabled}
      >
        <Text style={[styles.fonts.h2, {color}]}>{text}</Text>
      </Pressable>
    );
  },
);
