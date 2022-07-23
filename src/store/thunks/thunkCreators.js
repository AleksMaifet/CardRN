import {apiAuthorization, apiCard, apiPack} from 'src/apiRequests';
import {handleScrollView, handleServerError, handleTimerEnd} from 'src/utils';
import {
  AuthorizationAC,
  DeleteCardAC,
  IsLoadingAC,
  IsLoadingRefreshListAC,
  UpdateTotalCardsCountAC,
} from 'src/store/reducers';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const LoginizationTC = createAsyncThunk(
  'authorization/Loginization',
  async (params, {dispatch, rejectWithValue}) => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      const {data} = await apiAuthorization.setLoginUser(params);
      return {data};
    } catch (err) {
      handleServerError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      handleTimerEnd(dispatch);
    }
  },
);

export const AuthorizationTC = (values, scrollView) => {
  return async dispatch => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      const {
        data: {addedUser},
      } = await apiAuthorization.registerUser(values);
      dispatch(AuthorizationAC({data: addedUser}));
      handleScrollView(scrollView, 0);
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  };
};

export const LogOutTC = createAsyncThunk(
  'authorization/LogOut',
  async (params, {dispatch, rejectWithValue}) => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      await apiAuthorization.logOutUser();
      return {data: {}};
    } catch (err) {
      handleServerError(err, dispatch);
      return rejectWithValue(null);
    } finally {
      handleTimerEnd(dispatch);
    }
  },
);

export const UpdateUserParamTC = createAsyncThunk(
  'authorization/Loginization',
  async (params, {dispatch, rejectWithValue}) => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      const {
        data: {updatedUser},
      } = await apiAuthorization.updateUserParam(params);
      return {data: updatedUser};
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  },
);

export const GetCardsTC = createAsyncThunk(
  'cards/GetCards',
  async (params, {dispatch, rejectWithValue, getState}) => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    const cardsPack_id = getState().packs.pack._id;
    const {cardQuestion, pageCount} = getState().cards;
    const value = {
      cardQuestion,
      cardsPack_id,
      pageCount,
    };
    try {
      const {data} = await apiCard.getUserCards(value);
      return {cards: data};
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  },
);

export const SetCardTC = card => {
  return async (dispatch, getState) => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    const cardsPack_id = getState().packs.pack._id;
    try {
      await apiCard.setUserCard({...card, cardsPack_id});
      dispatch(GetCardsTC());
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch, 1700);
    }
  };
};

export const DeleteCardTC = cardId => {
  return async (dispatch, getState) => {
    const cardsPack_id = getState().packs.pack._id;
    const params = {
      cardsPack_id,
    };
    try {
      dispatch(DeleteCardAC({id: cardId}));
      await apiCard.deleteUserCard(cardId);
      const {
        data: {cardsTotalCount},
      } = await apiCard.getUserCards(params);
      dispatch(UpdateTotalCardsCountAC({cardsTotalCount}));
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const GetPacksTC = createAsyncThunk(
  'packs/GetPacks',
  async (params, {dispatch, rejectWithValue, getState}) => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    const userId = getState().authorization.signInData._id;
    const packName = getState().packs.searchPackName;
    const pageCount = getState().packs.pageCount;
    const value = {
      pageCount,
      user_id: userId,
      packName,
    };
    try {
      const {data} = await apiPack.getUserPacks(value);
      return {packs: data};
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  },
);

export const RefreshPacksTC = createAsyncThunk(
  'packs/RefreshPacks',
  async (params, {dispatch, rejectWithValue, getState}) => {
    dispatch(IsLoadingRefreshListAC({isLoading: 'loading'}));
    const userId = getState().authorization.signInData._id;
    const packName = getState().packs.searchPackName;
    const pageCount = getState().packs.pageCount;
    const value = {
      pageCount,
      user_id: userId,
      packName,
    };
    try {
      const {data} = await apiPack.getUserPacks(value);
      return {packs: data};
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      dispatch(IsLoadingRefreshListAC({isLoading: 'success'}));
    }
  },
);

export const GetNextPackTC = createAsyncThunk(
  'packs/GetNextPack',
  async (params, {dispatch, rejectWithValue, getState}) => {
    const userId = getState().authorization.signInData._id;
    const pageCount = getState().packs.pageCount;
    const value = {
      pageCount,
      page: params,
      user_id: userId,
    };
    try {
      const {data} = await apiPack.getUserPacks(value);
      return {data};
    } catch (err) {
      handleServerError(err, dispatch);
    }
  },
);

export const SetPackTC = title => {
  return async dispatch => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      await apiPack.setUserPack(title);
      dispatch(GetPacksTC());
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch, 800);
    }
  };
};

export const UpdatePackTitleTC = createAsyncThunk(
  'packs/UpdatePackTitle',
  async ({id, name}, {dispatch, rejectWithValue}) => {
    try {
      await apiPack.updateUserPack(id, name);
      return {id, name};
    } catch (err) {
      handleServerError(err, dispatch);
    }
  },
);

export const DeletePackTC = id => {
  return async dispatch => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      await apiPack.deleteUserPack(id);
      dispatch(GetPacksTC());
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};
