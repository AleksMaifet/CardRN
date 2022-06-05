import {Modal, Pressable} from 'react-native';
import React, {memo} from 'react';

export const ModalWindow = memo(
  ({
    children,
    showModal,
    closeShowModal,
    animation = 'slide',
    justifyContent = 'center',
    backgroundColor = 'rgba(0,0,0,0.3)',
  }) => {
    return (
      <Modal animationType={animation} visible={showModal} transparent>
        <Pressable
          onPress={closeShowModal}
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor,
            justifyContent,
          }}
        >
          {children}
        </Pressable>
      </Modal>
    );
  },
);
