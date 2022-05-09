import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SuperButton, SupperInput} from 'src/components/CoreComponents';
import React, {memo, useEffect, useState} from 'react';
import {GeneralStyles} from 'src/assets/generalStyles';
import {ERROR_MESSAGES} from 'src/components/Screens/Main/Authorization/Form';
import Alert from 'react-native/Libraries/Alert/Alert';

const MAX_LENGTH_PACK_NAME = 21;

export const ModalScreen = memo(
  ({
    currentTitle,
    showModal,
    isShowModal,
    callback,
    animation = 'slide',
    title,
    preTitle,
    buttonText,
    primaryButtonText,
  }) => {
    const [value, setValue] = useState('');

    const showModalHandle = () => {
      isShowModal();
      setValue('');
    };

    const onPressEvent = () => {
      if (value.length < MAX_LENGTH_PACK_NAME) {
        callback(value);
        showModalHandle();
        return;
      }
      Alert.alert(ERROR_MESSAGES.INVALID_PACK_NAME.CHARACTERS);
    };

    useEffect(() => {
      if (currentTitle) {
        setValue(currentTitle);
        return;
      }
      setValue(value);
    }, [showModal]);

    return (
      <Modal
        animationType={animation}
        visible={showModal}
        onRequestClose={isShowModal}
        transparent
      >
        <Pressable onPress={isShowModal} style={styles.modalWrapperStyle}>
          <View style={styles.modalContainerStyle}>
            <Text style={{...styles.textStyle, fontWeight: '700'}}>
              {title}
            </Text>
            <Text style={styles.textStyle}>{preTitle}</Text>
            <SupperInput
              value={value}
              onChangeText={setValue}
              borderColor={GeneralStyles.primary_color_second}
              selectionColor={GeneralStyles.primary_color_second}
            />
            <View style={styles.buttonContainerStyle}>
              <SuperButton
                callback={showModalHandle}
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
          </View>
        </Pressable>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalWrapperStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainerStyle: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  textStyle: {
    fontSize: 22,
    color: GeneralStyles.text_color,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
