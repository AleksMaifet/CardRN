import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Screens} from '../screens';
import {useSelector} from 'react-redux';
import {selectorGetToken} from 'src/store/selectors';
import {CardsScreen, FormScreen} from 'src/components/Screens';
import {BottomTab} from 'src/navigation/tabs';

export const ContainerStack = () => {
  const Stack = createStackNavigator();
  const isToken = useSelector(selectorGetToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}
    >
      {!isToken ? (
        <Stack.Screen name={Screens.FORM_SCREEN} component={FormScreen} />
      ) : (
        <>
          <Stack.Screen name={Screens.HOME_SCREEN} component={BottomTab} />
          <Stack.Screen name={Screens.CARDS_SCREEN} component={CardsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
