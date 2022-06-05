import React from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {styles} from 'src/assets/generalStyles';

export const FormContainer = ({children}) => {
  return (
    <KeyboardAvoidingView style={styles.formContainer}>
      {children}
    </KeyboardAvoidingView>
  );
};
