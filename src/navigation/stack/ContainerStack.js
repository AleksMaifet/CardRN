import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  CardsScreen,
  FormScreen,
  PacksScreen,
} from 'src/components/Screens/Main';
import {Screens} from '../screens';
import {useSelector} from 'react-redux';
import {selectorGetToken} from 'src/store/selectors';

export const ContainerStack = () => {
  const Stack = createStackNavigator();
  const isToken = useSelector(selectorGetToken);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {!isToken ? (
        <Stack.Screen name={Screens.FORM_SCREEN} component={FormScreen} />
      ) : (
        <>
          <Stack.Screen name={Screens.PACKS_SCREEN} component={PacksScreen} />
          <Stack.Screen name={Screens.CARDS_SCREEN} component={CardsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
