import {
  APP_ACTION_TYPES,
  APP_AUTHORIZATION_TYPES,
} from 'src/store/actions/actionTypes';

const initState = {
  errorAuthorizationMessage: null,
  errorUploadAvatarMessage: null,
};

export const appErrorReducer = (state = initState, action) => {
  switch (action.type) {
    case APP_AUTHORIZATION_TYPES.APP_AUTHORIZATION_ERROR_DATA:
    case APP_ACTION_TYPES.APP_UPLOAD_AVATAR_ERROR_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
