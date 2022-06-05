import React, {memo} from 'react';
import {View} from 'react-native';
import {SuperButton} from 'src/components/CoreComponents/Button';
import {COLORS, styles} from 'src/assets/generalStyles';
import IconDrawerOff from 'react-native-vector-icons/AntDesign';

export const DrawerContainer = memo(({callback, title}) => {
  return (
    <View style={styles.drawerContainer}>
      <View
        style={[
          {flexDirection: 'row', marginVertical: 30},
          styles.flexContainer,
        ]}
      >
        <IconDrawerOff name={'poweroff'} size={25} color={COLORS.black} />
        <SuperButton width={150} callback={callback} text={title} />
      </View>
    </View>
  );
});
