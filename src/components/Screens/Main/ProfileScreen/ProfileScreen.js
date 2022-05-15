import React from 'react';
import {GeneralStyles} from 'src/assets/generalStyles';
import {StyleSheet, Text, View, Image} from 'react-native';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {useSelector} from 'react-redux';
import {selectorGetAvatar, selectorGetName} from 'src/store/selectors';
import imageUserNotFound from 'src/assets/images/imageNotFountUser.png';
import {SuperButton} from 'src/components/CoreComponents';

const BUTTON_TITLE = 'Edit profile';

export const ProfileScreen = () => {
  const getUserAvatar = useSelector(selectorGetAvatar);
  const getUserName = useSelector(selectorGetName);

  return (
    <LinearGradientWrapper
      color={GeneralStyles.liner_gradient.firstColorScreen}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={getUserAvatar ? {uri: `${getUserAvatar}`} : imageUserNotFound}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{getUserName}</Text>
      </View>
      <SuperButton
        text={BUTTON_TITLE}
        color={GeneralStyles.primary_color}
        callback={() => console.log('click')}
      />
    </LinearGradientWrapper>
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
