import React, {memo} from 'react';
import {Image, View} from 'react-native';
import imageUserNotFound from 'src/assets/images/imageNotFountUser.png';
import {styles} from 'src/assets/generalStyles';

export const ImageComponent = memo(
  ({avatar, width, height, borderColor = 'rgba(0,0,0,0)'}) => {
    return (
      <View
        style={{
          width,
          height,
          borderRadius: width / 2,
          borderWidth: 2,
          overflow: 'hidden',
          borderColor,
        }}
      >
        <Image
          style={styles.image}
          source={avatar ? {uri: `${avatar}`} : imageUserNotFound}
          resizeMode={'cover'}
        />
      </View>
    );
  },
);
