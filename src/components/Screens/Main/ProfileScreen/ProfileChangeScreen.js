import React, {useCallback, useEffect, useState} from 'react';
import {Header} from 'src/components/Screens/Header';
import {COLORS, styles} from 'src/assets/generalStyles';
import {TouchableOpacity, View} from 'react-native';
import {Indicator, SupperInput} from 'src/components/CoreComponents';
import ArrowIcon from 'react-native-vector-icons/FontAwesome';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectGetAvatar,
  selectGetName,
  selectIsLoading,
} from 'src/store/selectors';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {PhotoUploadComponent} from 'src/components/SvgComponents';
import {UpdateUserParamTC} from 'src/store/thunks';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImageComponent} from 'src/components/ImageComponent';
import {UploadAvatarErrorAC} from 'src/store/reducers';

const TITLE_HEADER_CHANGE_PROFILE = 'Personal Information';
const ERROR_UPLOAD_AVATAR_MESSAGE = 'User cancelled image picker';

const options = {
  selectionLimit: 1,
  quality: 1,
  mediaType: 'photo',
  includeBase64: true,
  includeExtra: true,
};

export const ProfileChangeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const getUserAvatar = useSelector(selectGetAvatar);
  const getUserName = useSelector(selectGetName);

  const [nameValue, setNameValue] = useState('');

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
      dispatch(
        UploadAvatarErrorAC({
          error: ERROR_UPLOAD_AVATAR_MESSAGE,
        }),
      );
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
      icon={<ArrowIcon name="arrow-left" size={20} color={COLORS.secondary} />}
      callback={() => navigation.goBack()}
    >
      <LinearGradientWrapper color={styles.liner_gradient.firstColorScreen}>
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          color={COLORS.gray}
        >
          <View>
            <ImageComponent width={200} height={200} avatar={getUserAvatar} />
            <PhotoUploadComponent callback={uploadImageHandle} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 50,
              marginVertical: 20,
            }}
          >
            <SupperInput
              placeholder={'Nickname'}
              value={nameValue}
              onChangeText={setNameValue}
              borderColor={COLORS.gray}
              width={200}
              onEndEditing={updateUserNameHandle}
              multiline
              numberOfLines={1}
            />
            <TouchableOpacity onPress={updateUserNameHandle}>
              <PlusIcon name="pluscircleo" size={30} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        </Indicator>
      </LinearGradientWrapper>
    </Header>
  );
};
