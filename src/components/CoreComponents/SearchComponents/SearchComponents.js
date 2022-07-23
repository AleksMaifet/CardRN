import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SupperInput} from 'src/components/CoreComponents/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, SIZES, styles} from 'src/assets/generalStyles';
import {useSelector} from 'react-redux';
import {selectIsLoading} from 'src/store/selectors';

const SEARCH_PLACEHOLDER = 'Search';

export const SearchComponents = ({onPress, backgroundColor}) => {
  const isLoading = useSelector(selectIsLoading);

  const [value, setValue] = useState('');

  const onPressSearchEvent = () => {
    onPress(value);
  };

  const onPressCleanEvent = () => {
    setValue('');
  };

  const isActivePointer = isLoading === 'loading' ? 'none' : 'auto';

  return (
    <View
      pointerEvents={isActivePointer}
      style={[
        styles.flexContainer,
        {
          flexDirection: 'row',
          width: SIZES.width,
          backgroundColor,
        },
      ]}
    >
      <TouchableOpacity onPress={onPressSearchEvent}>
        <Icon name="search" size={18} color={COLORS.secondary} />
      </TouchableOpacity>
      <SupperInput
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onPressSearchEvent}
        placeholder={SEARCH_PLACEHOLDER}
        keyType={'search'}
        placeholderTextColor={COLORS.secondary}
      />
      <TouchableOpacity onPress={onPressCleanEvent}>
        <Icon name="close" size={20} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};
