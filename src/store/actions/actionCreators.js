import {
  APP_ACTION_TYPES,
  APP_AUTHORIZATION_TYPES,
  APP_CARDS_TYPES,
  APP_PACKS_TYPES,
} from 'src/store/actions/actionTypes';

export const IsLoadingAC = isLoading => {
  return {
    type: APP_ACTION_TYPES.APP_IS_LOADING,
    payload: {
      isLoading,
    },
  };
};

export const IsLoadingRefreshListAC = isRefreshListLoading => {
  return {
    type: APP_ACTION_TYPES.APP_IS_LOADING_REFRESH_LIST,
    payload: {
      isRefreshListLoading,
    },
  };
};

export const LoginizationAC = signInData => {
  return {
    type: APP_AUTHORIZATION_TYPES.APP_LOGINIZATION_DATA,
    payload: {
      signInData,
    },
  };
};

export const AuthorizationAC = signUpData => {
  return {
    type: APP_AUTHORIZATION_TYPES.APP_AUTHORIZATION_DATA,
    payload: {
      signUpData,
    },
  };
};

export const AuthorizationErrorAC = errorMessage => {
  return {
    type: APP_AUTHORIZATION_TYPES.APP_AUTHORIZATION_ERROR_DATA,
    errorMessage,
  };
};

export const GetPacksAC = data => {
  return {
    type: APP_PACKS_TYPES.APP_GET_PACKS,
    data,
  };
};

export const SetNextPackAC = data => {
  return {
    type: APP_PACKS_TYPES.APP_SET_NEXT_PACK,
    data,
  };
};

export const SearchPackNameAC = searchPackName => {
  return {
    type: APP_PACKS_TYPES.APP_SET_SEARCH_PACK_NAME,
    payload: {
      searchPackName,
    },
  };
};

export const UpdatePackTitleAC = (name, id) => {
  return {
    type: APP_PACKS_TYPES.APP_CHANGE_PACK_TITLE,
    name,
    id,
  };
};

export const DeletePackAC = id => {
  return {
    type: APP_PACKS_TYPES.APP_SET_DELETE_PAGE,
    id,
  };
};

export const SetMaxCountPageAC = (pageCount, cardPacksTotalCount) => {
  return {
    type: APP_PACKS_TYPES.APP_SET_MAX_COUNT_PAGE,
    payload: {
      pageCount,
      cardPacksTotalCount,
    },
  };
};

export const SetCardPackIdAC = cardPackId => {
  return {
    type: APP_CARDS_TYPES.APP_SET_CARD_PACK_ID,
    payload: {
      cardPackId,
    },
  };
};

export const GetCardsAC = data => {
  return {
    type: APP_CARDS_TYPES.APP_GET_CARDS,
    data,
  };
};
