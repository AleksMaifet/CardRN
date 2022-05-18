import React, {useCallback, useEffect, useState} from 'react';
import {Header} from 'src/components/Screens/Header';
import {GeneralStyles} from 'src/assets/generalStyles';
import {Image, StyleSheet, View} from 'react-native';
import imageUserNotFound from 'src/assets/images/imageNotFountUser.png';
import {
  Indicator,
  SuperButton,
  SupperInput,
} from 'src/components/CoreComponents';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectorGetAvatar,
  selectorGetName,
  selectorIsLoading,
} from 'src/store/selectors';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {PhotoUploadComponent} from 'src/components/SvgComponents';
import {UpdateUserParamTC} from 'src/store/thunks';

const TITLE_HEADER_CHANGE_PROFILE = 'Personal Information';
const BUTTON_TITLE = 'Save';

export const ChangeProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectorIsLoading);
  const getUserAvatar = useSelector(selectorGetAvatar);
  const getUserName = useSelector(selectorGetName);

  const [nameValue, setNameValue] = useState('');

  const updateUserParamHandle = useCallback(() => {
    dispatch(UpdateUserParamTC({name: nameValue}));
    navigation.goBack();
  }, [dispatch, nameValue]);

  useEffect(() => {
    setNameValue(getUserName);
  }, [getUserName]);

  return (
    <Header
      title={TITLE_HEADER_CHANGE_PROFILE}
      icon={
        <Icon
          name="arrow-left"
          size={18}
          color={GeneralStyles.text_color_second}
        />
      }
      callback={() => navigation.goBack()}
    >
      <LinearGradientWrapper
        color={GeneralStyles.liner_gradient.firstColorScreen}
      >
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          color={GeneralStyles.border_color}
        >
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={
                  getUserAvatar ? {uri: `${getUserAvatar}`} : imageUserNotFound
                }
                resizeMode={'cover'}
              />
            </View>
            <PhotoUploadComponent />
          </View>
          <View style={styles.textContainer}>
            <SupperInput
              placeholder={'Nickname'}
              value={nameValue}
              onChangeText={setNameValue}
              borderColor={GeneralStyles.border_color}
              width={300}
            />
          </View>
          <SuperButton
            text={BUTTON_TITLE}
            color={GeneralStyles.text_color_second}
            backgroundColor={GeneralStyles.primary_color}
            callback={updateUserParamHandle}
          />
        </Indicator>
      </LinearGradientWrapper>
    </Header>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: GeneralStyles.text_color,
    fontFamily: 'Poppins-Bold',
  },
  textContainer: {
    paddingHorizontal: 50,
    marginVertical: 30,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 300,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
