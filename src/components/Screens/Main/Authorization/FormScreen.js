import React, {useEffect, useRef} from 'react';

import {Animated, ScrollView, View} from 'react-native';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {COLORS, SIZES, styles} from 'src/assets/generalStyles';
import {handleScrollView, loadState} from 'src/utils';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoading} from 'src/store/selectors';
import {Indicator} from 'src/components/CoreComponents';
import {
  FormIn,
  FormTitle,
  FormUp,
} from 'src/components/Screens/Main/Authorization/Form';

const TITLE_TEXT_IN = 'Sign In';
const TITLE_TEXT_UP = 'Sign Up';

export const FormScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();

  const sinInColorInterpolate = animation.interpolate({
    inputRange: [0, SIZES.width],
    outputRange: [COLORS.red, COLORS.purplish_pink],
  });
  const sinUpColorInterpolate = animation.interpolate({
    inputRange: [0, SIZES.width],
    outputRange: [COLORS.purplish_pink, COLORS.red],
  });

  useEffect(
    () => async () => {
      await loadState();
    },
    [dispatch],
  );

  return (
    <LinearGradientWrapper color={styles.liner_gradient.firstColorScreen}>
      <View style={{paddingTop: '40%'}}>
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          color={COLORS.gray}
          height={50}
        />
        <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
          <FormTitle
            title={TITLE_TEXT_IN}
            onPress={() => handleScrollView(scrollView, 0)}
            backgroundColor={sinInColorInterpolate}
          />
          <FormTitle
            title={TITLE_TEXT_UP}
            onPress={() => handleScrollView(scrollView, SIZES.width)}
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
          <View style={{alignItems: 'center', width: SIZES.width}}>
            <FormIn />
          </View>
          <View style={{alignItems: 'center', width: SIZES.width}}>
            <FormUp scrollView={scrollView} />
          </View>
        </ScrollView>
      </View>
    </LinearGradientWrapper>
  );
};
