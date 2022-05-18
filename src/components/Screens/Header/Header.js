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
        <TouchableOpacity style={styles.icon} onPress={callback}>
          {icon}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      {children}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 60,
    width,
    backgroundColor: GeneralStyles.primary_color_second,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: GeneralStyles.liner_gradient.firstColorScreen[1],
  },
});
