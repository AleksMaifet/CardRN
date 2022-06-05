import {Animated, Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from 'src/assets/generalStyles';
import React, {memo} from 'react';

export const FormTitle = memo(({title, onPress, backgroundColor}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {height: 45, width: '50%', borderRadius: 5},
          styles.flexContainer,
          {backgroundColor},
        ]}
      >
        <Text style={styles.fonts.h1}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});
