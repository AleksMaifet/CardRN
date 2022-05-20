import React, {memo} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {GeneralStyles} from 'src/assets/generalStyles';

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
          GeneralStyles.flexContainer,
          {width, height, backgroundColor, borderRadius: 30},
        ]}
        onPress={onPressEvent}
        disabled={disabled}
      >
        <Text style={[styles.text, {color}]}>{text}</Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    fontWeight: GeneralStyles.fontWeight,
    fontSize: 20,
    fontFamily: GeneralStyles.fontFamily,
  },
});
