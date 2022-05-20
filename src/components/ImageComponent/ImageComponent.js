import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import imageUserNotFound from 'src/assets/images/imageNotFountUser.png';

export const ImageComponent = memo(
  ({avatar, width, height, borderColor = 'rgba(0,0,0,0)'}) => {
    return (
      <View style={[styles.imageContainer, {width, height, borderColor}]}>
        <Image
          style={styles.image}
          source={avatar ? {uri: `${avatar}`} : imageUserNotFound}
          resizeMode={'cover'}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 2,
    borderRadius: 300,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
