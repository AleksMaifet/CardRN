import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {GeneralStyles} from 'src/assets/generalStyles';

const {width} = Dimensions.get('window');

export const Header = memo(({children, title, callback, icon}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={callback}>{icon}</TouchableOpacity>
        <View style={[styles.textContainer, GeneralStyles.flexContainer]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      {children}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    width,
    backgroundColor: GeneralStyles.primary_color_second,
  },
  textContainer: {
    width: width / 1.2,
    paddingRight: '10%',
  },
  text: {
    fontSize: 25,
    fontFamily: GeneralStyles.fontFamily,
    fontWeight: GeneralStyles.fontWeight,
    color: GeneralStyles.liner_gradient.firstColorScreen[1],
  },
});
