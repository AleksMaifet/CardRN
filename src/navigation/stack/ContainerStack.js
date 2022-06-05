import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {Screens} from '../screens';
import {useSelector} from 'react-redux';
import {selectGetToken} from 'src/store/selectors';
import {
  CardsScreen,
  FormScreen,
  ProfileChangeScreen,
} from 'src/components/Screens';
import {BottomTab} from 'src/navigation/tabs';

const Stack = createStackNavigator();

export const ContainerStack = () => {
  const isToken = useSelector(selectGetToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isToken ? (
        <Stack.Screen
          name={Screens.FORM_SCREEN}
          component={FormScreen}
          options={{
            presentation: 'transparentModal',
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name={Screens.BOTTOM_TAB_SCREENS}
            component={BottomTab}
            options={{
              presentation: 'transparentModal',
            }}
          />
          <Stack.Screen
            name={Screens.CARDS_SCREEN}
            component={CardsScreen}
            options={{
              presentation: 'transparentModal',
            }}
          />
          <Stack.Screen
            name={Screens.PROFILE_CHANGE_SCREEN}
            component={ProfileChangeScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
