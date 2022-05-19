import React, {useCallback, useEffect, useState} from 'react';
import {Header} from 'src/components/Screens/Header';
import {GeneralStyles} from 'src/assets/generalStyles';
import {Image, StyleSheet, View} from 'react-native';
import imageUserNotFound from 'src/assets/images/imageNotFountUser.png';
import {Indicator, SupperInput} from 'src/components/CoreComponents';
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
import {launchImageLibrary} from 'react-native-image-picker';
import {UploadAvatarErrorAC} from 'src/store/actions';

const TITLE_HEADER_CHANGE_PROFILE = 'Personal Information';
const ERROR_UPLOAD_AVATAR_MESSAGE = 'User cancelled image picker';

const options = {
  selectionLimit: 1,
  quality: 1,
  mediaType: 'photo',
  includeBase64: true,
  includeExtra: true,
};

export const ChangeProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectorIsLoading);
  const getUserAvatar = useSelector(selectorGetAvatar);
  const getUserName = useSelector(selectorGetName);

  const [nameValue, setNameValue] = useState('');

  // const newName = useDebounce(nameValue, 300);

  const uploadImageHandle = async () => {
    try {
      const {assets} = await launchImageLibrary(options);
      const {base64, type} = assets[0];
      const base64Format = `data:${type};base64,${base64}`;
      dispatch(
        UpdateUserParamTC({
          avatar: base64Format,
        }),
      );
      navigation.goBack();
    } catch (e) {
      dispatch(UploadAvatarErrorAC(ERROR_UPLOAD_AVATAR_MESSAGE));
    }
  };

  const updateUserNameHandle = useCallback(() => {
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
            <PhotoUploadComponent callback={uploadImageHandle} />
          </View>
          <View style={styles.textContainer}>
            <SupperInput
              placeholder={'Nickname'}
              value={nameValue}
              onChangeText={setNameValue}
              borderColor={GeneralStyles.border_color}
              width={300}
              onEndEditing={updateUserNameHandle}
            />
          </View>
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
