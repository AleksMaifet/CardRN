import {COLORS, SIZES, styles} from 'src/assets/generalStyles';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import React, {useCallback, useEffect, useState} from 'react';
import {Header} from 'src/components/Screens/Header';
import {Card} from 'src/components/Screens/Main/CardsScreen/Card';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeleteCardTC,
  DeletePackTC,
  GetCardsTC,
  SetCardTC,
  UpdatePackTitleTC,
} from 'src/store/thunks';
import {
  selectGetCardQustionName,
  selectGetCards,
  selectGetPackName,
  selectIsLoading,
} from 'src/store/selectors';
import SwipeCards from 'react-native-swipe-cards-deck';
import {
  Indicator,
  SearchComponents,
  SuperButton,
} from 'src/components/CoreComponents';
import {View} from 'react-native';
import {
  ModalMenu,
  ModalScreenCard,
  ModalScreenPack,
} from 'src/components/ModalWindow/ModalScreens';
import {ModalWindow} from 'src/components/ModalWindow';
import IconArrow from 'react-native-vector-icons/FontAwesome';
import IconDots from 'react-native-vector-icons/Entypo';
import {SearchCardQuestionNameAC, SetPackAC} from 'src/store/reducers';

const PLACEHOLDER_TEXT = 'Enter a question';
const PRIMARY_PLACEHOLDER_TEXT = 'Enter an answer';
const BUTTON_TEXT = 'SAVE';
const BUTTON_VALUE = 'ADD CARD';
const SWIPE_CARD_DELETE = 'DELETE!';
const SWIPE_CARD_NEXT = 'NEXT!';
const MENU_BUTTON_TEXT = 'DELETE';
const MENU_PRIMARY_BUTTON_TEXT = 'EDIT';

export const CardsScreen = ({route, navigation}) => {
  const {
    params: {id},
  } = route;

  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const getPackName = useSelector(selectGetPackName);
  const getCards = useSelector(selectGetCards);
  const getQuestionName = useSelector(selectGetCardQustionName);

  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isChangeModeOn, setIsChangeModeOn] = useState(false);
  const [cardId, setCardId] = useState('');

  const showModalHandle = () => {
    setShowModal(state => !state);
  };

  const showMenuHandle = () => {
    setShowMenu(state => !state);
    setIsChangeModeOn(false);
  };

  const onPressSetCardHandle = useCallback(
    card => {
      dispatch(SetCardTC(card));
    },
    [dispatch],
  );

  const onPressSearchCardNameHandle = useCallback(
    searchText => {
      dispatch(SearchCardQuestionNameAC({question: searchText}));
    },
    [dispatch],
  );

  const onPressChangeTitlePackHandle = useCallback(
    title => {
      if (getPackName !== title) {
        dispatch(UpdatePackTitleTC({name: title, id}));
      }
    },
    [dispatch, id, getPackName],
  );

  const onPressDeletePackHandle = useCallback(() => {
    showMenuHandle();
    dispatch(DeletePackTC(id));
    navigation.goBack();
  }, [dispatch, id]);

  const onPressDeleteCardHandle = () => {
    dispatch(DeleteCardTC(cardId));
  };

  useEffect(() => {
    dispatch(SetPackAC({id}));
    return () => {
      dispatch(SearchCardQuestionNameAC({question: null}));
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(GetCardsTC());
  }, [dispatch, getQuestionName]);

  return (
    <Header
      title={getPackName}
      callback={() => navigation.goBack()}
      primaryCallback={showMenuHandle}
      icon={<IconArrow name="arrow-left" size={18} color={COLORS.secondary} />}
      primaryIcon={
        <IconDots
          name="dots-three-vertical"
          size={18}
          color={COLORS.secondary}
        />
      }
    >
      <LinearGradientWrapper color={styles.liner_gradient.firstColorScreen}>
        <ModalWindow
          showModal={showMenu}
          closeShowModal={showMenuHandle}
          animation={'fade'}
          backgroundColor={
            !isChangeModeOn ? 'rgba(0,0,0,0.0)' : 'rgba(0,0,0,0.3)'
          }
          justifyContent={isChangeModeOn ? 'center' : 'flex-start'}
        >
          {isChangeModeOn ? (
            <ModalScreenPack
              currentTitle={getPackName}
              titleText={'Change Pack Name'}
              buttonText={'CANCEL'}
              primaryButtonText={'CHANGE'}
              callback={onPressChangeTitlePackHandle}
              showModal={showMenuHandle}
            />
          ) : (
            <ModalMenu
              callback={onPressDeletePackHandle}
              primaryCallback={() => setIsChangeModeOn(true)}
              color={COLORS.secondary}
              buttonText={MENU_BUTTON_TEXT}
              primaryButtonText={MENU_PRIMARY_BUTTON_TEXT}
            />
          )}
        </ModalWindow>
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
        <SearchComponents onPress={onPressSearchCardNameHandle} />
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          height={SIZES.height / 1.406}
          color={COLORS.gray}
        >
          <SwipeCards
            cards={getCards}
            keyExtractor={item => item._id}
            renderCard={({question, answer, _id}) => (
              <Card
                question={question}
                answer={answer}
                id={_id}
                setCardId={setCardId}
              />
            )}
            renderNoMoreCards={() => {}}
            actions={{
              nope: {
                text: SWIPE_CARD_DELETE,
                color: COLORS.red,
                onAction: onPressDeleteCardHandle,
              },
              maybe: {show: false},
              yup: {
                text: SWIPE_CARD_NEXT,
                color: COLORS.green,
              },
            }}
          />
        </Indicator>
        <View
          style={{
            width: SIZES.width,
            paddingHorizontal: 10,
            marginVertical: 20,
          }}
        >
          <SuperButton
            text={BUTTON_VALUE}
            callback={showModalHandle}
            backgroundColor={COLORS.red}
            color={COLORS.secondary}
            width={'100%'}
            disabled={isLoading === 'loading'}
          />
        </View>
      </LinearGradientWrapper>
    </Header>
  );
};
