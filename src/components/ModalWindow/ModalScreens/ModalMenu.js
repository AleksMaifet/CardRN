import React from 'react';
import {View} from 'react-native';
import {SuperButton} from 'src/components/CoreComponents';
import {memo} from 'react';
import {COLORS} from 'src/assets/generalStyles';

export const ModalMenu = memo(
  ({color, buttonText, primaryButtonText, callback, primaryCallback}) => {
    return (
      <View
        style={{
          width: 150,
          height: 75,
          marginLeft: 190,
          marginTop: 40,
          backgroundColor: COLORS.black,
        }}
      >
        <View>
          <SuperButton
            color={color}
            width={150}
            text={buttonText}
            callback={callback}
          />
          <SuperButton
            color={color}
            width={150}
            text={primaryButtonText}
            callback={primaryCallback}
          />
        </View>
      </View>
    );
  },
);
