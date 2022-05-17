import React, {useCallback, useState} from 'react';
import {GeneralStyles} from 'src/assets/generalStyles';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectorGetAvatar,
  selectorGetName,
  selectorIsLoading,
} from 'src/store/selectors';
import imageUserNotFound from 'src/assets/images/imageNotFountUser.png';
import {Indicator, SuperButton} from 'src/components/CoreComponents';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {Header} from 'src/components/Screens/Header';
import Modal from 'react-native-modal';
import {DrawerContainer} from 'src/components/CoreComponents/DrawerContainer';
import IconMenu from 'react-native-vector-icons/MaterialIcons';
import {LogOutTC} from 'src/store/thunks';

const BUTTON_TITLE = 'Edit profile';
const BUTTON_TITLE_DRAWER = 'Logout';
const TITLE_HEADER_PROFILE = 'Profile';

export const ProfileScreen = () => {
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

  if (isLoading === 'loading') {
    return (
      <LinearGradientWrapper
        color={GeneralStyles.liner_gradient.firstColorScreen}
      >
        <Indicator isShow size={'large'} color={GeneralStyles.border_color} />
      </LinearGradientWrapper>
    );
  }

  return (
    <Header
      title={TITLE_HEADER_PROFILE}
      icon={
        <IconMenu name={'menu'} size={25} color={GeneralStyles.text_color} />
      }
      callback={showModalHandle}
    >
      <LinearGradientWrapper
        color={GeneralStyles.liner_gradient.firstColorScreen}
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              getUserAvatar ? {uri: `${getUserAvatar}`} : imageUserNotFound
            }
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{getUserName}</Text>
        </View>
        <SuperButton
          text={BUTTON_TITLE}
          color={GeneralStyles.primary_color}
          callback={() => {}}
        />
      </LinearGradientWrapper>
    </Header>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 0,
  },
  text: {
    fontSize: 18,
    color: GeneralStyles.text_color,
    fontFamily: 'Poppins-Bold',
  },
  textContainer: {
    paddingHorizontal: 50,
    marginVertical: 50,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 300,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
