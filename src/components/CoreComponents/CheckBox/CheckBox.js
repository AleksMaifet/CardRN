import React, {memo, useEffect, useState} from 'react';
import {styles} from 'src/assets/generalStyles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CHECK_BOX_TITLE = 'Remember Me?';

export const CheckBox = memo(
  ({value, onChange, checkColor, backgroundColor}) => {
    const [isCheck, setCheck] = useState(null);

    const checkClicked = () => {
      setCheck(state => !state);
    };

    useEffect(() => {
      onChange(isCheck);
    }, [isCheck]);

    return (
      <BouncyCheckbox
        fillColor={backgroundColor}
        unfillColor={checkColor}
        isChecked={value}
        text={CHECK_BOX_TITLE}
        textStyle={styles.fonts.body3}
        onPress={checkClicked}
      />
    );
  },
);
