import React, {useRef} from 'react';

import {Animated, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {GeneralStyles} from 'src/assets/generalStyles';
import {handleScrollView} from 'src/utils';
import {useSelector} from 'react-redux';
import {selectorIsLoading} from 'src/store/selectors';
import {Indicator} from 'src/components/CoreComponents';
import {
  FormIn,
  FormTitle,
  FormUp,
} from 'src/components/Screens/Main/Authorization/Form';

const TITLE_TEXT_IN = 'Sign In';
const TITLE_TEXT_UP = 'Sign Up';

const {width} = Dimensions.get('window');

export const FormScreen = () => {
  const isLoading = useSelector(selectorIsLoading);

  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();

  const sinInColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['red', 'pink'],
  });
  const sinUpColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['pink', 'red'],
  });

  return (
    <LinearGradientWrapper
      color={GeneralStyles.liner_gradient.firstColorScreen}
    >
      <View style={styles.formContainer}>
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          color={GeneralStyles.border_color}
          height={50}
        />
        <View style={styles.titleContainer}>
          <FormTitle
            title={TITLE_TEXT_IN}
            onPress={() => handleScrollView(scrollView, 0)}
            backgroundColor={sinInColorInterpolate}
          />
          <FormTitle
            title={TITLE_TEXT_UP}
            onPress={() => handleScrollView(scrollView, width)}
            backgroundColor={sinUpColorInterpolate}
          />
        </View>
        <ScrollView
          ref={scrollView}
          keyboardShouldPersistTaps="handled"
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: animation}}}],
            {useNativeDriver: false},
          )}
        >
          <View style={styles.form}>
            <FormIn />
          </View>
          <View style={styles.form}>
            <FormUp scrollView={scrollView} />
          </View>
        </ScrollView>
      </View>
    </LinearGradientWrapper>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: '40%',
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  form: {
    alignItems: 'center',
    width,
  },
});
