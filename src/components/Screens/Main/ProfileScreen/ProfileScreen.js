import React, {useCallback, useState} from 'react';
import {COLORS, styles} from 'src/assets/generalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectGetAvatar,
  selectGetName,
  selectIsLoading,
} from 'src/store/selectors';
import {Indicator, SuperButton} from 'src/components/CoreComponents';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {LogOutTC} from 'src/store/thunks';
import {Header} from 'src/components/Screens/Header';
import IconMenu from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {DrawerContainer} from 'src/components/CoreComponents/DrawerContainer';
import {Text, View} from 'react-native';
import {Screens} from 'src/navigation/screens';
import {ImageComponent} from 'src/components/ImageComponent';

const BUTTON_TITLE = 'Edit profile';
const BUTTON_TITLE_DRAWER = 'Logout';
const TITLE_HEADER_PROFILE = 'Profile';

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const getUserAvatar = useSelector(selectGetAvatar);
  const getUserName = useSelector(selectGetName);

  const [isModalVisible, setModalVisible] = useState(false);

  const showModalHandle = () => {
    setModalVisible(state => !state);
  };

  const logOutHandle = useCallback(() => {
    dispatch(LogOutTC());
  }, [dispatch]);

  return (
    <Header
      title={TITLE_HEADER_PROFILE}
      callback={showModalHandle}
      icon={<IconMenu name={'menu'} size={30} color={COLORS.black} />}
    >
      <LinearGradientWrapper color={styles.liner_gradient.firstColorScreen}>
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          color={COLORS.gray}
        >
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={showModalHandle}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            style={{margin: 0}}
          >
            <DrawerContainer
              callback={logOutHandle}
              title={BUTTON_TITLE_DRAWER}
            />
          </Modal>
          <ImageComponent width={250} height={250} avatar={getUserAvatar} />
          <View style={{paddingHorizontal: 50, marginVertical: 20}}>
            <Text style={[styles.fonts.h1, {color: COLORS.black}]}>
              {getUserName}
            </Text>
          </View>
          <SuperButton
            width={100}
            text={BUTTON_TITLE}
            color={COLORS.primary}
            callback={() => navigation.navigate(Screens.PROFILE_CHANGE_SCREEN)}
          />
        </Indicator>
      </LinearGradientWrapper>
    </Header>
  );
};
