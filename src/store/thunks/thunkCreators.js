import {apiAuthorization, apiCard, apiPack} from 'src/apiRequests';
import {
  AuthorizationAC,
  DeleteCardAC,
  DeletePackAC,
  GetCardsAC,
  GetPacksAC,
  IsLoadingAC,
  IsLoadingRefreshListAC,
  LoginizationAC,
  SetMaxCountPageAC,
  SetNextPackAC,
  UpdatePackTitleAC,
  UpdateTotalCardsCountAC,
  UpdateTotalPacksCountAC,
} from 'src/store/actions';
import {
  handleScrollView,
  handleServerError,
  handleSpinnerTimerEnd,
} from 'src/utils';

export const LoginizationTC = values => {
  return async dispatch => {
    dispatch(IsLoadingAC('loading'));
    try {
      const {data} = await apiAuthorization.setLoginUser(values);
      dispatch(LoginizationAC(data));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleSpinnerTimerEnd(dispatch);
    }
  };
};

export const AuthorizationTC = (values, scrollView) => {
  return async dispatch => {
    dispatch(IsLoadingAC('loading'));
    try {
      const {
        data: {addedUser},
      } = await apiAuthorization.registerUser(values);
      dispatch(AuthorizationAC(addedUser));
      handleScrollView(scrollView, 0);
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleSpinnerTimerEnd(dispatch);
    }
  };
};

export const LogOutTC = () => {
  return async dispatch => {
    dispatch(IsLoadingAC('loading'));
    try {
      await apiAuthorization.logOutUser();
      dispatch(LoginizationAC({}));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleSpinnerTimerEnd(dispatch);
    }
  };
};

export const GetPacksTC = () => {
  return async (dispatch, getState) => {
    dispatch(IsLoadingAC('loading'));
    const userId = getState().authorization.signInData._id;
    const packName = getState().packs.searchPackName;
    const params = {
      user_id: userId,
      packName,
    };
    try {
      const {data} = await apiPack.getUserPacks(params);
      const {pageCount, cardPacksTotalCount} = data;
      dispatch(GetPacksAC(data));
      dispatch(SetMaxCountPageAC(pageCount, cardPacksTotalCount));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleSpinnerTimerEnd(dispatch);
    }
  };
};

export const RefreshPacksTC = () => {
  return async (dispatch, getState) => {
    dispatch(IsLoadingRefreshListAC('loading'));
    const userId = getState().authorization.signInData._id;
    const packName = getState().packs.searchPackName;
    const params = {
      user_id: userId,
      packName,
    };
    try {
      const {data} = await apiPack.getUserPacks(params);
      const {pageCount, cardPacksTotalCount} = data;
      dispatch(GetPacksAC(data));
      dispatch(SetMaxCountPageAC(pageCount, cardPacksTotalCount));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      dispatch(IsLoadingRefreshListAC('success'));
    }
  };
};

export const GetNextPackTC = page => {
  return async (dispatch, getState) => {
    const userId = getState().authorization.signInData._id;
    const params = {
      page,
      user_id: userId,
    };
    try {
      const {data} = await apiPack.getUserPacks(params);
      dispatch(SetNextPackAC(data));
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const SetPackTC = title => {
  return async dispatch => {
    dispatch(IsLoadingAC('loading'));
    try {
      await apiPack.setUserPack(title);
      dispatch(GetPacksTC());
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleSpinnerTimerEnd(dispatch, 800);
    }
  };
};

export const UpdatePackTitleTC = (name, id) => {
  return async dispatch => {
    try {
      await apiPack.updateUserPack(id, name);
      dispatch(UpdatePackTitleAC(name, id));
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const DeletePackTC = id => {
  return async (dispatch, getState) => {
    const userId = getState().authorization.signInData._id;
    const params = {
      user_id: userId,
    };
    try {
      dispatch(DeletePackAC(id));
      await apiPack.deleteUserPack(id);
      const {
        data: {cardPacksTotalCount},
      } = await apiPack.getUserPacks(params);
      dispatch(UpdateTotalPacksCountAC(cardPacksTotalCount));
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const GetCardsTC = () => {
  return async (dispatch, getState) => {
    dispatch(IsLoadingAC('loading'));
    const {cardQuestion, cardPackId, pageCount} = getState().cards;
    const params = {
      cardQuestion,
      cardsPack_id: cardPackId,
      pageCount,
    };
    try {
      const {data} = await apiCard.getUserCards(params);
      dispatch(GetCardsAC(data));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleSpinnerTimerEnd(dispatch);
    }
  };
};

export const SetCardTC = card => {
  return async (dispatch, getState) => {
    dispatch(IsLoadingAC('loading'));
    const cardsPack_id = getState().cards.cardPackId;
    try {
      await apiCard.setUserCard({...card, cardsPack_id});
      dispatch(GetCardsTC());
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      handleSpinnerTimerEnd(dispatch, 1700);
    }
  };
};

export const DeleteCardTC = cardId => {
  return async (dispatch, getState) => {
    const cardsPack_id = getState().cards.cardPackId;
    const params = {
      cardsPack_id,
    };
    try {
      dispatch(DeleteCardAC(cardId));
      await apiCard.deleteUserCard(cardId);
      const {
        data: {cardsTotalCount},
      } = await apiCard.getUserCards(params);
      dispatch(UpdateTotalCardsCountAC(cardsTotalCount));
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};
