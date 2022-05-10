import {StyleSheet, Text, View} from 'react-native';
import {SuperButton, SupperInput} from 'src/components/CoreComponents';
import {GeneralStyles} from 'src/assets/generalStyles';
import React, {memo, useEffect, useState} from 'react';
import Alert from 'react-native/Libraries/Alert/Alert';
import {ERROR_MESSAGES} from 'src/components/Screens/Main/Authorization/Form';

const MAX_LENGTH_PACK_NAME = 21;

export const ModalScreenPack = memo(
  ({
    currentTitle,
    showModal,
    callback,
    titleText,
    preTitleText,
    buttonText,
    primaryButtonText,
  }) => {
    const [value, setValue] = useState('');

    const showModalEvent = () => {
      showModal();
      setValue('');
    };

    const onPressEvent = () => {
      if (value.length < MAX_LENGTH_PACK_NAME) {
        callback(value);
        showModalEvent();
        return;
      }
      Alert.alert(ERROR_MESSAGES.INVALID_PACK_NAME.CHARACTERS);
    };

    useEffect(() => {
      if (currentTitle) {
        setValue(currentTitle);
      }
    }, [currentTitle]);

    return (
      <>
        <Text style={{...styles.text, fontWeight: '700'}}>{titleText}</Text>
        <Text style={styles.textStyle}>{preTitleText}</Text>
        <SupperInput
          value={value}
          onChangeText={setValue}
          borderColor={GeneralStyles.primary_color_second}
          selectionColor={GeneralStyles.primary_color_second}
        />
        <View style={styles.buttonContainer}>
          <SuperButton
            callback={showModalEvent}
            width={100}
            text={buttonText}
            color={GeneralStyles.primary_color_second}
          />
          <SuperButton
            callback={onPressEvent}
            width={100}
            text={primaryButtonText}
            color={GeneralStyles.primary_color_second}
          />
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: GeneralStyles.text_color,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
