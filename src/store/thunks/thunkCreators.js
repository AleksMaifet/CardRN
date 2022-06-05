import {apiAuthorization, apiCard, apiPack} from 'src/apiRequests';
import {handleScrollView, handleServerError, handleTimerEnd} from 'src/utils';
import {
  AuthorizationAC,
  DeleteCardAC,
  GetCardsAC,
  GetPacksAC,
  IsLoadingAC,
  IsLoadingRefreshListAC,
  LoginizationAC,
  SetNextPackAC,
  UpdatePackTitleAC,
  UpdateTotalCardsCountAC,
} from 'src/store/reducers';

export const LoginizationTC = values => {
  return async dispatch => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      const {data} = await apiAuthorization.setLoginUser(values);
      dispatch(LoginizationAC({data}));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  };
};

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

export const UpdateUserParamTC = param => {
  return async dispatch => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      const {
        data: {updatedUser},
      } = await apiAuthorization.updateUserParam(param);
      dispatch(LoginizationAC({data: updatedUser}));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  };
};

export const LogOutTC = () => {
  return async dispatch => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    try {
      dispatch(LoginizationAC({data: {}}));
      dispatch(AuthorizationAC({data: {}}));
      await apiAuthorization.logOutUser();
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  };
};

export const GetPacksTC = () => {
  return async (dispatch, getState) => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    const userId = getState().authorization.signInData._id;
    const packName = getState().packs.searchPackName;
    const pageCount = getState().packs.pageCount;
    const params = {
      pageCount,
      user_id: userId,
      packName,
    };
    try {
      const {data} = await apiPack.getUserPacks(params);
      dispatch(GetPacksAC({packs: data}));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  };
};

export const RefreshPacksTC = () => {
  return async (dispatch, getState) => {
    dispatch(IsLoadingRefreshListAC({isLoading: 'loading'}));
    const userId = getState().authorization.signInData._id;
    const packName = getState().packs.searchPackName;
    const pageCount = getState().packs.pageCount;
    const params = {
      pageCount,
      user_id: userId,
      packName,
    };
    try {
      const {data} = await apiPack.getUserPacks(params);
      dispatch(GetPacksAC({packs: data}));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      dispatch(IsLoadingRefreshListAC({isLoading: 'success'}));
    }
  };
};

export const GetNextPackTC = page => {
  return async (dispatch, getState) => {
    const userId = getState().authorization.signInData._id;
    const pageCount = getState().packs.pageCount;
    const params = {
      pageCount,
      page,
      user_id: userId,
    };
    try {
      const {data} = await apiPack.getUserPacks(params);
      dispatch(SetNextPackAC({data}));
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

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

export const UpdatePackTitleTC = (name, id) => {
  return async dispatch => {
    try {
      await apiPack.updateUserPack(id, name);
      dispatch(UpdatePackTitleAC({name, id}));
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

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

export const GetCardsTC = () => {
  return async (dispatch, getState) => {
    dispatch(IsLoadingAC({isLoading: 'loading'}));
    const cardsPack_id = getState().packs.pack._id;
    const {cardQuestion, pageCount} = getState().cards;
    const params = {
      cardQuestion,
      cardsPack_id,
      pageCount,
    };
    try {
      const {data} = await apiCard.getUserCards(params);
      dispatch(GetCardsAC({cards: data}));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleTimerEnd(dispatch);
    }
  };
};

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
