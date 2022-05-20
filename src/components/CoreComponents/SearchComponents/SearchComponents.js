import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SupperInput} from 'src/components/CoreComponents/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GeneralStyles} from 'src/assets/generalStyles';

const SEARCH_PLACEHOLDER = 'Search';

const {width} = Dimensions.get('window');

export const SearchComponents = ({onPress, backgroundColor}) => {
  const [value, setValue] = useState('');

  const onPressSearchEvent = () => {
    onPress(value);
  };

  const onPressCleanEvent = () => {
    setValue('');
  };

  return (
    <View style={{...styles.searchWrapper, backgroundColor}}>
      <TouchableOpacity onPress={onPressSearchEvent}>
        <Icon
          name="search"
          size={18}
          color={GeneralStyles.text_color_second}
          style={styles.icon}
        />
      </TouchableOpacity>
      <SupperInput
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onPressSearchEvent}
        placeholder={SEARCH_PLACEHOLDER}
        keyType={'search'}
        placeholderTextColor={GeneralStyles.text_color_second}
      />
      <TouchableOpacity onPress={onPressCleanEvent}>
        <Icon
          name="close"
          size={20}
          color={GeneralStyles.text_color_second}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
  },
  icon: {
    marginHorizontal: 10,
  },
});
