import React, {memo} from 'react';
import {TextInput, View} from 'react-native';
import {styles} from 'src/assets/generalStyles';

export const SupperInput = memo(
  ({
    value,
    onChangeText,
    onSubmitEditing,
    onEndEditing,
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
          onEndEditing={onEndEditing}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          selectionColor={selectionColor}
          returnKeyType={keyType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoFocus={autoFocus}
          style={[
            styles.fonts.body3,
            {width, borderBottomWidth: 1, marginVertical: 5},
            isError ? {borderColor: errorBorderColor} : {borderColor},
          ]}
        />
        {svg}
      </View>
    );
  },
);
