import {Dimensions, Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';

export const ModalWindow = memo(
  ({children, showModal, closeShowModal, animation = 'slide'}) => {
    return (
      <Modal animationType={animation} visible={showModal} transparent>
        <Pressable onPress={closeShowModal} style={styles.modalWrapperStyle}>
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
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainerStyle: {
    width: Dimensions.get('window').width - 50,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
});
