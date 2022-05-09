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
    height = 40,
    borderColor,
    errorBorderColor,
    selectionColor,
    isError,
    keyType,
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
          style={[
            styles.input,
            {width, height},
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
    position: 'relative',
    borderBottomWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
