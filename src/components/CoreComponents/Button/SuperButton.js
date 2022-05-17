import React, {memo} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

export const SuperButton = memo(
  ({callback, text, width = 265, height = 36, backgroundColor, color}) => {
    const onPressEvent = () => {
      callback();
    };

    return (
      <Pressable
        style={[styles.button, {width, height, backgroundColor}]}
        onPress={onPressEvent}
      >
        <Text style={[styles.text, {color}]}>{text}</Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  text: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Poppins-Bold',
  },
});
