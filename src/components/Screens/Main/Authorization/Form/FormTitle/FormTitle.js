import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {GeneralStyles} from 'src/assets/generalStyles';
import React, {memo} from 'react';

export const FormTitle = memo(({title, onPress, backgroundColor}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[styles.text, GeneralStyles.flexContainer, {backgroundColor}]}
      >
        <Text style={GeneralStyles.authorization.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  text: {
    height: 45,
    width: '50%',
    borderRadius: 5,
  },
});
