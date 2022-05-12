import React, {memo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export const SupperInput = memo(
  ({
    value,
    onChangeText,
    onSubmitEditing,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    width = 315,
    borderColor,
    errorBorderColor,
    selectionColor,
    isError,
    keyType,
    multiline,
    autoFocus,
    numberOfLines,
    svg,
  }) => {
    return (
      <View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          selectionColor={selectionColor}
          returnKeyType={keyType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoFocus={autoFocus}
          style={[
            styles.input,
            {width},
            isError ? {borderColor: errorBorderColor} : {borderColor},
          ]}
        />
        {svg}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
