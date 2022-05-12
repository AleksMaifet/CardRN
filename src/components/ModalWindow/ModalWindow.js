import {Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {GeneralStyles} from 'src/assets/generalStyles';

export const ModalWindow = memo(
  ({
    children,
    showModal,
    closeShowModal,
    animation = 'slide',
    justifyContent = 'center',
  }) => {
    return (
      <Modal animationType={animation} visible={showModal} transparent>
        <Pressable
          onPress={closeShowModal}
          style={{...styles.modalWrapperStyle, justifyContent}}
        >
          <View style={styles.modalContainerStyle}>{children}</View>
        </Pressable>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalWrapperStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainerStyle: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: GeneralStyles.text_color_second,
    padding: 20,
    marginVertical: 20,
    borderRadius: 12,
  },
});
