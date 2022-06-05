import {Text, View} from 'react-native';
import {SuperButton, SupperInput} from 'src/components/CoreComponents';
import {COLORS, styles} from 'src/assets/generalStyles';
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
      <View style={styles.modalContainer}>
        <Text style={styles.fonts.body2}>{titleText}</Text>
        <Text style={styles.fonts.body3}>{preTitleText}</Text>
        <SupperInput
          value={value}
          onChangeText={setValue}
          borderColor={COLORS.red}
          selectionColor={COLORS.red}
          autoFocus={!!currentTitle}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <SuperButton
            callback={showModalEvent}
            width={100}
            text={buttonText}
            color={COLORS.red}
          />
          <SuperButton
            callback={onPressEvent}
            width={100}
            text={primaryButtonText}
            color={COLORS.red}
          />
        </View>
      </View>
    );
  },
);
