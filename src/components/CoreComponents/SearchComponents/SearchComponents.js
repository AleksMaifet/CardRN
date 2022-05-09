import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SupperInput} from 'src/components/CoreComponents/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GeneralStyles} from 'src/assets/generalStyles';

const SEARCH_PLACEHOLDER = 'Search';

export const SearchComponents = ({onPress}) => {
  const [value, setValue] = useState('');

  const onPressSearchEvent = () => {
    onPress(value);
  };

  const onPressCleanEvent = () => {
    setValue('');
  };

  return (
    <View style={styles.searchWrapperStyle}>
      <TouchableOpacity onPress={onPressSearchEvent}>
        <Icon
          name="search"
          size={18}
          color={GeneralStyles.text_color_second}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <SupperInput
        value={value}
        onChangeText={setValue}
        onEndEditing={onPressSearchEvent}
        placeholder={SEARCH_PLACEHOLDER}
        keyType={'search'}
        placeholderTextColor={GeneralStyles.text_color_second}
      />
      <TouchableOpacity onPress={onPressCleanEvent}>
        <Icon
          name="close"
          size={20}
          color={GeneralStyles.text_color_second}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: GeneralStyles.primary_color_second,
  },
  iconStyle: {
    marginHorizontal: 10,
  },
});
