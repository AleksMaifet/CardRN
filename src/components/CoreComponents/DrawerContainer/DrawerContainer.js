import React, {memo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {SuperButton} from 'src/components/CoreComponents/Button';
import {GeneralStyles} from 'src/assets/generalStyles';
import IconDrawerOff from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

export const DrawerContainer = memo(({callback, title}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.containerButton, GeneralStyles.flexContainer]}>
        <IconDrawerOff
          name={'poweroff'}
          size={25}
          color={GeneralStyles.text_color}
        />
        <SuperButton width={150} callback={callback} text={title} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height,
    width: width / 2,
    backgroundColor: GeneralStyles.text_color_second,
    padding: 10,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  containerButton: {
    flexDirection: 'row',
    marginVertical: 30,
  },
});
