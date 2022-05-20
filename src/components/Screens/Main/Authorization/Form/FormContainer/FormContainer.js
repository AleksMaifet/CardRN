import React from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const FormContainer = ({children}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 300,
    width,
    paddingHorizontal: 20,
  },
});
