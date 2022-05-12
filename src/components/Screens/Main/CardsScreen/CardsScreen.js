import {GeneralStyles} from 'src/assets/generalStyles';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import React, {useCallback, useEffect, useState} from 'react';
import {Header} from 'src/components/Screens/Header';
import {Card} from 'src/components/Screens/Main/CardsScreen/Card';
import {useDispatch, useSelector} from 'react-redux';
import {SetCardPackIdAC} from 'src/store/actions';
import {GetCardsTC, SetCardTC} from 'src/store/thunks';
import {selectorGetCards, selectorIsLoading} from 'src/store/selectors';
import SwipeCards from 'react-native-swipe-cards-deck';
import {Indicator, SuperButton} from 'src/components/CoreComponents';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ModalScreenCard} from 'src/components/ModalWindow/ModalScreens';
import {ModalWindow} from 'src/components/ModalWindow';

const PLACEHOLDER_TEXT = 'Enter a question';
const PRIMARY_PLACEHOLDER_TEXT = 'Enter an answer';
const BUTTON_TEXT = 'SAVE';

const BUTTON_VALUE = 'ADD CARD';

export const CardsScreen = ({route}) => {
  const {
    params: {id, name},
  } = route;

  const dispatch = useDispatch();

  const isLoading = useSelector(selectorIsLoading);
  const getCards = useSelector(selectorGetCards);

  const [showModal, setShowModal] = useState(false);

  const showModalHandle = () => {
    setShowModal(state => !state);
  };

  const onPressSetCardHandle = useCallback(
    card => {
      dispatch(SetCardTC(card));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(SetCardPackIdAC(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(GetCardsTC());
  }, [dispatch]);

  return (
    <Header title={name}>
      <LinearGradientWrapper
        color={GeneralStyles.liner_gradient.firstColorScreen}
      >
        <ModalWindow
          showModal={showModal}
          closeShowModal={showModalHandle}
          justifyContent={'flex-end'}
        >
          <ModalScreenCard
            showModal={showModalHandle}
            callback={onPressSetCardHandle}
            placeholderText={PLACEHOLDER_TEXT}
            primaryPlaceholderText={PRIMARY_PLACEHOLDER_TEXT}
            buttonText={BUTTON_TEXT}
          />
        </ModalWindow>
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          height={615}
          color={GeneralStyles.border_color}
        >
          <SwipeCards
            cards={getCards}
            keyExtractor={item => item._id}
            renderCard={({question, answer, _id}) => (
              <Card question={question} answer={answer} id={_id} />
            )}
            renderNoMoreCards={() => {}}
            actions={{
              nope: {show: false},
              yup: {show: false},
              maybe: {show: false},
            }}
          />
        </Indicator>
        <View style={styles.buttonWrapper}>
          <SuperButton
            text={BUTTON_VALUE}
            callback={showModalHandle}
            backgroundColor={GeneralStyles.primary_color_second}
            color={GeneralStyles.text_color_second}
            width={'100%'}
          />
        </View>
      </LinearGradientWrapper>
    </Header>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
