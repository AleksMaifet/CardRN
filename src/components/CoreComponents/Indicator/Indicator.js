import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import React, {memo} from 'react';

export const Indicator = memo(({children, isShow, size, color, height}) => {
  return isShow ? (
    <SafeAreaView style={[styles.indicatorContainer, {height}]}>
      <ActivityIndicator size={size} color={color} />
    </SafeAreaView>
  ) : (
    <>{children}</>
  );
});

const styles = StyleSheet.create({
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
