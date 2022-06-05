import {Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS, styles} from 'src/assets/generalStyles';
import {Screens} from 'src/navigation/screens';

const COUNT_TEXT = 'Cards';

export const Pack = memo(({navigation, name, count, id, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => navigation.navigate(Screens.CARDS_SCREEN, {id})}
      style={styles.PACK.packContainer}
    >
      <View style={styles.PACK.countContainer}>
        <Text style={[styles.fonts.body2, {color: COLORS.purplish_pink}]}>
          {count}
        </Text>
        <Text style={styles.fonts.h2}>{COUNT_TEXT}</Text>
      </View>
      <View style={{justifyContent: 'center', height: 100}}>
        <Text style={styles.fonts.h1}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
});
