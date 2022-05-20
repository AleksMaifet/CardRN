import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {GeneralStyles} from 'src/assets/generalStyles';

export const CheckBox = ({
  onChange,
  borderColor,
  primary_borderColor,
  backgroundColor,
}) => {
  const [isCheck, setCheck] = useState(false);

  const checkClicked = () => {
    setCheck(state => !state);
  };

  useEffect(() => {
    onChange(`${isCheck}`);
  }, [isCheck]);

  return (
    <TouchableOpacity onPress={checkClicked}>
      <View
        style={[
          styles.mainBox,
          GeneralStyles.flexContainer,
          {borderColor},
          {
            backgroundColor: !isCheck ? borderColor : primary_borderColor,
          },
        ]}
      >
        <View
          style={[
            {backgroundColor, borderRadius: 99},
            {
              height: !isCheck ? 20 : 15,
              width: !isCheck ? 20 : 15,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    height: 24,
    width: 24,
    borderRadius: 99,
  },
});
