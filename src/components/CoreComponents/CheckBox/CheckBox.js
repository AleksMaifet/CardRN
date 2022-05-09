import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

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
          {borderColor},
          {
            backgroundColor: !isCheck ? borderColor : primary_borderColor,
          },
        ]}
      >
        <View
          style={[
            styles.inputBox,
            {backgroundColor},
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
    borderRadius: 99,
  },
  inputBox: {
    borderRadius: 99,
  },
});
