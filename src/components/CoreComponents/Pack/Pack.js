import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {GeneralStyles} from 'src/assets/generalStyles';

const COUNT_TEST = 'Cards';

export const Pack = memo(
  ({name, count, id, changeTitleHandle, deleteHandle}) => {
    const onPressDeletePackEvent = () => {
      deleteHandle(id);
    };

    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.countContainer}>
          <Text style={{...styles.count, fontSize: 22}}>{count}</Text>
          <Text style={styles.count}>{COUNT_TEST}</Text>
        </View>
        <View style={styles.textTitleCotainer}>
          <Text style={styles.textTitle}>{name}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Icon
              size={30}
              name="pencil"
              color={GeneralStyles.primary_color_second}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressDeletePackEvent}>
            <Icon
              size={35}
              name="eye-off"
              color={GeneralStyles.primary_color_second}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: 350,
    height: 250,
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'rgb(255, 222, 179)',
    borderBottomColor: GeneralStyles.primary_color_second,
    borderRightColor: GeneralStyles.primary_color_second,
    borderBottomWidth: 10,
    borderRightWidth: 4,
    borderBottomRightRadius: 300,
    elevation: 5,
  },
  textTitleCotainer: {
    justifyContent: 'center',
    width: 200,
    height: 100,
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    color: GeneralStyles.liner_gradient.firstColorScreen[1],
    fontSize: 30,
  },
  countContainer: {
    alignItems: 'center',
    width: 90,
    padding: 20,
    backgroundColor: '#954AA1',
    borderRadius: 30,
  },
  count: {
    color: 'pink',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 50,
    right: 50,
    width: 80,
  },
});
