import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {GeneralStyles} from 'src/assets/generalStyles';
import {useDispatch, useSelector} from 'react-redux';

import {
  selectorGetPacks,
  selectorGetPackSearchName,
  selectorGetPacksTotalCount,
  selectorGetPageCount,
  selectorIsLoading,
  selectorIsRefreshListLoading,
} from 'src/store/selectors';
import {
  Indicator,
  SearchComponents,
  SuperButton,
} from 'src/components/CoreComponents';
import {ModalWindow} from 'src/components/ModalWindow';
import {SearchPackNameAC} from 'src/store/actions';
import {
  DeletePackTC,
  GetNextPackTC,
  GetPacksTC,
  RefreshPacksTC,
  SetPackTC,
  UpdatePackTitleTC,
} from 'src/store/thunks';
import {ModalScreenPack} from 'src/components/ModalWindow/ModalScreens';
import {Pack} from 'src/components/Screens/Main/PacksScreen/Pack';

const BUTTON_VALUE = 'ADD PACK';
const TITLE_TEXT = 'New Pack';
const PRE_TITLE_TEXT = 'Enter a name';
const BUTTON_TEXT = 'CANCEL';
const PRIMARY_BUTTON_TEXT = 'CREATE';

const START_PAGE_VALUE = 2;

const {width} = Dimensions.get('window');

export const PacksScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectorIsLoading);
  const isRefreshListLoading = useSelector(selectorIsRefreshListLoading);
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

  const showModalHandle = () => {
    setShowModal(state => !state);
  };

  const onPressSearchPackNameHandle = useCallback(
    searchText => {
      searchText.length ? setIsLoadMore(false) : setIsLoadMore(true);
      dispatch(SearchPackNameAC(searchText));
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

  const onPressChangeTitlePackHandle = useCallback(
    (title, id) => {
      dispatch(UpdatePackTitleTC(title, id));
    },
    [dispatch],
  );

  const onPressDeletePackHandle = useCallback(
    id => {
      dispatch(DeletePackTC(id));
    },
    [dispatch],
  );

  const loadMoreItemHandle = () => {
    if (isShowIndicator) {
      setCurrentPage(state => state + 1);
      dispatch(GetNextPackTC(currentPage));
    }
  };

  const onRefreshHandle = () => {
    dispatch(RefreshPacksTC());
    setCurrentPage(START_PAGE_VALUE);
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
      <ModalWindow showModal={showModal} closeShowModal={showModalHandle}>
        <ModalScreenPack
          showModal={showModalHandle}
          callback={onPressSetPackHandle}
          titleText={TITLE_TEXT}
          preTitleText={PRE_TITLE_TEXT}
          buttonText={BUTTON_TEXT}
          primaryButtonText={PRIMARY_BUTTON_TEXT}
        />
      </ModalWindow>
      <SearchComponents
        onPress={onPressSearchPackNameHandle}
        backgroundColor={GeneralStyles.primary_color_second}
      />
      <Indicator
        isShow={isLoading === 'loading'}
        size={'large'}
        height={566}
        color={GeneralStyles.border_color}
      >
        <FlatList
          data={getPacks}
          renderItem={({item: {name, cardsCount, _id}}) => {
            return (
              <Pack
                navigation={navigation}
                name={name}
                count={cardsCount}
                id={_id}
                changeTitleHandle={onPressChangeTitlePackHandle}
                deleteHandle={onPressDeletePackHandle}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshListLoading === 'loading'}
              onRefresh={onRefreshHandle}
            />
          }
          keyExtractor={item => item._id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItemHandle}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
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
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
