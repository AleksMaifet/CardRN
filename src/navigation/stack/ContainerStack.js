import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FormScreen, PacksScreen} from 'src/components/Screens/Main';
import {Screens} from '../screens';
import {useSelector} from 'react-redux';
import {selectorGetToken} from 'src/store/selectors';

export const ContainerStack = () => {
  const Stack = createNativeStackNavigator();

  const isToken = useSelector(selectorGetToken);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isToken ? (
        <Stack.Screen name={Screens.FORM_SCREEN} component={FormScreen} />
      ) : (
        <Stack.Screen name={Screens.PACKS_SCREEN} component={PacksScreen} />
      )}
    </Stack.Navigator>
  );
};
