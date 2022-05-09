import {apiAuthorization, apiPack} from 'src/apiRequests';
import {
  AuthorizationAC,
  DeletePackAC,
  GetPacksAC,
  IsLoadingAC,
  LoginizationAC,
  SetMaxCountPageAC,
  SetNextPackAC,
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
      dispatch(IsLoadingAC('success'));
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
      dispatch(IsLoadingAC('success'));
    }
  };
};

export const GetPacksTC = () => {
  return async (dispatch, getState) => {
    const userId = getState().authorization.signInData._id;
    const packName = getState().packs.searchPackName;
    const params = {
      user_id: userId,
      packName,
    };
    dispatch(IsLoadingAC('loading'));
    try {
      const {data} = await apiPack.getUserPacks(params);
      const {pageCount, cardPacksTotalCount} = data;
      dispatch(GetPacksAC(data));
      dispatch(SetMaxCountPageAC(pageCount, cardPacksTotalCount));
    } catch (err) {
      handleServerError(err, dispatch);
    } finally {
      dispatch(IsLoadingAC('success'));
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
      handleSpinnerTimerEnd(dispatch);
    }
  };
};

export const DeletePackTC = id => {
  return async dispatch => {
    try {
      await apiPack.deleteUserPack(id);
      dispatch(DeletePackAC(id));
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};
