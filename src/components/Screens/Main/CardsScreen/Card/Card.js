import React, {memo, useEffect} from 'react';

import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GeneralStyles} from 'src/assets/generalStyles';

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
    <SafeAreaView>
      <Pressable onPress={flipAnimation}>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <View style={styles.container}>
            <Text
              style={{
                ...styles.text,
                fontSize: 30,
                color: GeneralStyles.primary_color_third,
              }}
            >
              {TITLE_FRONT_SIDE}
            </Text>
            <View style={styles.strip} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{question}</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}
        >
          <View>
            <Text style={styles.text}>{answer}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  textContainer: {
    justifyContent: 'center',
    height: '80%',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  strip: {
    height: 3,
    backgroundColor: GeneralStyles.primary_color_second,
  },
  flipCard: {
    width: 350,
    height: 300,
    padding: 10,
    backgroundColor: GeneralStyles.text_color_second,
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: GeneralStyles.text_color_second,
  },
});
