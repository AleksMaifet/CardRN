import {GeneralStyles} from 'src/assets/generalStyles';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import React from 'react';
import {Header} from 'src/components/Screens/Header';
import {Card} from 'src/components/Screens/Main/CardsScreen/Card';

export const CardsScreen = ({route}) => {
  const {
    params: {id, name},
  } = route;
  return (
    <Header title={name}>
      <LinearGradientWrapper
        color={GeneralStyles.liner_gradient.firstColorScreen}
      >
        <Card />
      </LinearGradientWrapper>
    </Header>
  );
};
