import React, {memo, useEffect} from 'react';

import {Animated, Pressable, Text, View} from 'react-native';
import {COLORS, styles} from 'src/assets/generalStyles';

const TITLE_FRONT_SIDE = 'QUESTION';

export const Card = memo(({question, answer, id, setCardId}) => {
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

  useEffect(() => {
    setCardId(id);
  }, [id]);

  return (
    <>
      <Pressable onPress={flipAnimation}>
        <Animated.View style={[styles.CARD.flipCard, frontAnimatedStyle]}>
          <View style={{flex: 1, overflow: 'hidden'}}>
            <Text
              style={[
                styles.fonts.h2,
                {
                  fontSize: 30,
                  textAlign: 'center',
                  color: COLORS.purple,
                },
              ]}
            >
              {TITLE_FRONT_SIDE}
            </Text>
            <View style={{height: 3, backgroundColor: COLORS.red}} />
            <View style={[styles.flexContainer, {height: '80%'}]}>
              <Text style={[styles.fonts.body2, {textAlign: 'center'}]}>
                {question}
              </Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.CARD.flipCard,
            styles.CARD.flipCardBack,
            backAnimatedStyle,
          ]}
        >
          <View>
            <Text style={[styles.fonts.body2, {textAlign: 'center'}]}>
              {answer}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    </>
  );
});
