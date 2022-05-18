import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {Screens} from '../screens';
import {useSelector} from 'react-redux';
import {selectorGetToken} from 'src/store/selectors';
import {
  CardsScreen,
  ChangeProfileScreen,
  FormScreen,
} from 'src/components/Screens';
import {BottomTab} from 'src/navigation/tabs';

export const ContainerStack = () => {
  const Stack = createStackNavigator();
  const isToken = useSelector(selectorGetToken);

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
            name={Screens.BOTTOM_TAB_SCREEN}
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
            component={ChangeProfileScreen}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
