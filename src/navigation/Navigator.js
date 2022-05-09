import React from 'react';
import {ContainerStack} from './stack';
import {NavigationContainer} from '@react-navigation/native';

export const Navigator = () => {
  return (
    <NavigationContainer>
      <ContainerStack />
    </NavigationContainer>
  );
};
