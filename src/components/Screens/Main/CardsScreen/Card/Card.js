import React from 'react';

import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GeneralStyles} from 'src/assets/generalStyles';

export const Card = () => {
  const animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({value}) => {
    currentValue = value;
  });

  const flipAnimation = () => {
    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.spring(animatedValue, {
      toValue: 180,
      tension: 10,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  return (
    <SafeAreaView>
      <Pressable onPress={flipAnimation}>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <View>
            <Text style={{...styles.text, fontSize: 30, textAlign: 'center'}}>
              FRONT
            </Text>
            <View style={styles.strip} />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                ...styles.text,
                fontSize: 15,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
        >
          <Text>BACK</Text>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  text: {
    fontFamily: 'Poppins-Bold',
  },
  strip: {
    height: 3,
    backgroundColor: GeneralStyles.primary_color_second,
  },
  flipCard: {
    width: 350,
    height: 250,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'red',
  },
});
