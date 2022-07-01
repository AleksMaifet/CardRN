import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {LinearGradientWrapper} from 'src/components/LinearGradientWrapper';
import {COLORS, SIZES, styles} from 'src/assets/generalStyles';
import {useDispatch, useSelector} from 'react-redux';

import {
  selectGetPacks,
  selectGetPackSearchName,
  selectGetPacksTotalCount,
  selectGetPageCount,
  selectIsLoading,
  selectIsRefreshListLoading,
} from 'src/store/selectors';
import {
  Indicator,
  SearchComponents,
  SuperButton,
} from 'src/components/CoreComponents';
import {ModalWindow} from 'src/components/ModalWindow';
import {
  GetNextPackTC,
  GetPacksTC,
  RefreshPacksTC,
  SetPackTC,
} from 'src/store/thunks';
import {ModalScreenPack} from 'src/components/ModalWindow/ModalScreens';
import {Pack} from 'src/components/Screens/Main/PacksScreen/Pack';
import {SearchPackNameAC} from 'src/store/reducers';
import {loadState} from 'src/utils';

const BUTTON_VALUE = 'ADD PACK';
const TITLE_TEXT = 'New Pack';
const PRE_TITLE_TEXT = 'Enter a name';
const BUTTON_TEXT = 'CANCEL';
const PRIMARY_BUTTON_TEXT = 'CREATE';

const START_PAGE_VALUE = 2;

export const PacksScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const isRefreshListLoading = useSelector(selectIsRefreshListLoading);
  const getPacks = useSelector(selectGetPacks);
  const getSearchPackName = useSelector(selectGetPackSearchName);
  const getPageCount = useSelector(selectGetPageCount);
  const getPacksTotalCount = useSelector(selectGetPacksTotalCount);

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
      dispatch(SearchPackNameAC({title: searchText}));
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
    loadState();
    dispatch(GetPacksTC());
    setCurrentPage(START_PAGE_VALUE);
  }, [dispatch, getSearchPackName]);

  const renderLoader = () => {
    return (
      <Indicator isShow={isShowIndicator} size={'large'} color={COLORS.black} />
    );
  };

  return (
    <>
      <SearchComponents
        onPress={onPressSearchPackNameHandle}
        backgroundColor={COLORS.red}
      />
      <LinearGradientWrapper color={styles.liner_gradient.firstColorScreen}>
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
        <Indicator
          isShow={isLoading === 'loading'}
          size={'large'}
          height={SIZES.height / 1.38}
          color={COLORS.gray}
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
            numColumns={2}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItemHandle}
            onEndReachedThreshold={0}
            showsVerticalScrollIndicator={false}
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
    </>
  );
};
