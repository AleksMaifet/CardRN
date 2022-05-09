import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {GeneralStyles} from 'src/assets/generalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {Pack} from 'src/components/CoreComponents/Pack/Pack';
import {
  selectorGetPacks,
  selectorGetPackSearchName,
  selectorGetPacksTotalCount,
  selectorGetPageCount,
  selectorIsLoading,
} from 'src/store/selectors';
import {
  Indicator,
  SearchComponents,
  SuperButton,
} from 'src/components/CoreComponents';
import {ModalScreen} from 'src/components/ModalScreen';
import {SearchPackNameAC} from 'src/store/actions';
import {
  DeletePackTC,
  GetNextPackTC,
  GetPacksTC,
  SetPackTC,
} from 'src/store/thunks';

const BUTTON_VALUE = 'ADD PACK';

const TITLE_TEXT = 'New Pack';
const PRE_TITLE_TEXT = 'Enter a name';
const BUTTON_VALUE_BACK = 'CANCEL';
const SECOND_BUTTON_CREATE = 'CREATE';

const START_PAGE_VALUE = 2;

export const HomeScreen = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectorIsLoading);
  const getPacks = useSelector(selectorGetPacks);
  const getSearchPackName = useSelector(selectorGetPackSearchName);
  const getPageCount = useSelector(selectorGetPageCount);
  const getPacksTotalCount = useSelector(selectorGetPacksTotalCount);

  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(START_PAGE_VALUE);
  const [isLoadMore, setIsLoadMore] = useState(true);

  const maxPage = useMemo(() => {
    return Math.ceil(getPacksTotalCount / getPageCount);
  }, [getPageCount, getPacksTotalCount]);

  const isShowIndicator = currentPage <= maxPage && isLoadMore;

  const isShowModalHandle = () => {
    setShowModal(state => !state);
  };

  const onPressSearchPackNameHandle = useCallback(
    name => {
      name.length ? setIsLoadMore(false) : setIsLoadMore(true);
      dispatch(SearchPackNameAC(name));
    },
    [dispatch],
  );

  const onPressSetPackHandle = useCallback(
    name => {
      dispatch(SetPackTC(name));
      setCurrentPage(START_PAGE_VALUE);
    },
    [dispatch],
  );

  const onPressChangeTitlePackHandle = (title, id) => {
    console.log(title);
  };

  const onPressDeletePackHandle = useCallback(
    id => {
      dispatch(DeletePackTC(id));
    },
    [dispatch],
  );

  const loadMoreItem = () => {
    if (isShowIndicator) {
      setCurrentPage(state => state + 1);
      dispatch(GetNextPackTC(currentPage));
    }
  };

  useEffect(() => {
    dispatch(GetPacksTC());
    setCurrentPage(START_PAGE_VALUE);
  }, [dispatch, getSearchPackName]);

  const renderLoader = () => {
    return (
      <Indicator
        isShow={isShowIndicator}
        size={'large'}
        color={GeneralStyles.text_color}
      />
    );
  };

  return (
    <LinearGradientWrapper
      color={GeneralStyles.liner_gradient.firstColorScreen}
    >
      <ModalScreen
        showModal={showModal}
        isShowModal={isShowModalHandle}
        callback={onPressSetPackHandle}
        title={TITLE_TEXT}
        preTitle={PRE_TITLE_TEXT}
        buttonText={BUTTON_VALUE_BACK}
        primaryButtonText={SECOND_BUTTON_CREATE}
      />
      <SearchComponents onPress={onPressSearchPackNameHandle} />
      {isLoading === 'loading' ? (
        <Indicator
          isShow
          size={50}
          height={584}
          color={GeneralStyles.border_color}
        />
      ) : (
        <FlatList
          data={getPacks}
          renderItem={({item: {name, cardsCount, _id}}) => {
            return (
              <Pack
                name={name}
                count={cardsCount}
                id={_id}
                changeTitleHandle={onPressChangeTitlePackHandle}
                deleteHandle={onPressDeletePackHandle}
              />
            );
          }}
          keyExtractor={item => item._id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
        />
      )}
      <View style={styles.buttonWrapperStyle}>
        <SuperButton
          text={BUTTON_VALUE}
          callback={isShowModalHandle}
          backgroundColor={GeneralStyles.primary_color_second}
          color={GeneralStyles.text_color_second}
          width={'100%'}
        />
      </View>
    </LinearGradientWrapper>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  buttonWrapperStyle: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
