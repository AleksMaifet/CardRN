import React, {useCallback, useState} from 'react';
import {GeneralStyles} from 'src/assets/generalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectorGetAvatar,
  selectorGetName,
  selectorIsLoading,
} from 'src/store/selectors';
import {Indicator, SuperButton} from 'src/components/CoreComponents';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {LogOutTC} from 'src/store/thunks';
import {Header} from 'src/components/Screens/Header';
import IconMenu from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {DrawerContainer} from 'src/components/CoreComponents/DrawerContainer';
import {StyleSheet, Text, View} from 'react-native';
import {Screens} from 'src/navigation/screens';
import {ImageComponent} from 'src/components/ImageComponent';

const BUTTON_TITLE = 'Edit profile';
const BUTTON_TITLE_DRAWER = 'Logout';
const TITLE_HEADER_PROFILE = 'Profile';

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectorIsLoading);
  const getUserAvatar = useSelector(selectorGetAvatar);
  const getUserName = useSelector(selectorGetName);

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
      icon={
        <IconMenu name={'menu'} size={30} color={GeneralStyles.text_color} />
      }
    >
      <LinearGradientWrapper
        color={GeneralStyles.liner_gradient.firstColorScreen}
      >
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          color={GeneralStyles.border_color}
        >
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={showModalHandle}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            style={styles.view}
          >
            <DrawerContainer
              callback={logOutHandle}
              title={BUTTON_TITLE_DRAWER}
            />
          </Modal>
          <ImageComponent width={250} height={250} avatar={getUserAvatar} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{getUserName}</Text>
          </View>
          <SuperButton
            width={100}
            text={BUTTON_TITLE}
            color={GeneralStyles.primary_color}
            callback={() => navigation.navigate(Screens.PROFILE_CHANGE_SCREEN)}
          />
        </Indicator>
      </LinearGradientWrapper>
    </Header>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 0,
  },
  text: {
    fontSize: 38,
    color: GeneralStyles.text_color,
    fontFamily: GeneralStyles.fontFamily,
    fontWeight: GeneralStyles.fontWeight,
  },
  textContainer: {
    paddingHorizontal: 50,
    marginVertical: 20,
  },
});
