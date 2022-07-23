import React from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {SIZES, styles} from 'src/assets/generalStyles';
import {ScrollView, View} from 'react-native';

export const FormContainer = ({children, height = 2}) => {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.formContainer, {height: SIZES.height / height}]}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
