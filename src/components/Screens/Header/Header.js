import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GeneralStyles} from 'src/assets/generalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Header = ({children, title}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            size={18}
            color={GeneralStyles.text_color_second}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 60,
    backgroundColor: GeneralStyles.primary_color_second,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: GeneralStyles.liner_gradient.firstColorScreen[1],
  },
});
