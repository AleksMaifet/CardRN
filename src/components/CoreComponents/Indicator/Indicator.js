import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import React, {memo} from 'react';

export const Indicator = memo(({isShow, size, color, height}) => {
  return (
    isShow && (
      <SafeAreaView style={[styles.indicatorContainer, {height}]}>
        <ActivityIndicator size={size} color={color} />
      </SafeAreaView>
    )
  );
});

const styles = StyleSheet.create({
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});
